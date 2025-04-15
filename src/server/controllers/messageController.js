const { executeQuery } = require("../config/database");
const db = require("mssql");

// Búsqueda de usuario por término (nombre, handle, etc.)
const searchUser = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Falta el término de búsqueda" });
  }
  try {
    const sqlQuery = `
      SELECT TOP 1 user_id, user_handle, first_name, last_name, avatar_url
      FROM users
      WHERE user_handle LIKE '%' + @query + '%'
         OR first_name LIKE '%' + @query + '%'
         OR last_name LIKE '%' + @query + '%'
    `;
    const inputs = [{ name: "query", type: db.VarChar, value: query }];
    const result = await executeQuery(sqlQuery, inputs);

    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset[0]);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en la búsqueda de usuario:", error);
    res.status(500).json({ error: "Error interno en la búsqueda" });
  }
};

// Agregar contacto (puede ser inserción en tabla `contacts`)
const addContact = async (req, res) => {
    const userId = req.user.id;
    const { contactUserId } = req.body;
  
    if (!contactUserId) {
      return res.status(400).json({ error: "Falta el id del contacto" });
    }
  
    try {
      // Verificar si el contacto ya existe
      let sqlQuery = `
        SELECT * FROM contacts 
        WHERE user_id = @userId AND contact_user_id = @contactUserId
      `;
      let inputs = [
        { name: "userId", type: db.Int, value: userId },
        { name: "contactUserId", type: db.Int, value: contactUserId }
      ];
      const existing = await executeQuery(sqlQuery, inputs);
      if (existing.recordset.length > 0) {
        return res.status(400).json({ error: "Contacto ya agregado" });
      }
  
      // Insertar contacto
      sqlQuery = `
        INSERT INTO contacts (user_id, contact_user_id)
        VALUES (@userId, @contactUserId)
      `;
      await executeQuery(sqlQuery, inputs);
      console.log("Contacto insertado para el usuario", userId, "con contacto", contactUserId);
      res.status(200).json({ success: true, message: "Contacto agregado" });
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      res.status(500).json({ error: "Error interno al agregar contacto" });
    }
  };  

// Obtener contactos o chats recientes (puedes combinar contactos y mensajes)
const getContacts = async (req, res) => {
    const userId = req.user.id;
    try {
      const sqlQuery = `
        SELECT 
        c.contact_user_id as user_id,
        u.user_handle,
        u.avatar_url,
        MAX(m.sent_at) as last_message,
        (
          SELECT COUNT(*) 
          FROM messages 
          WHERE sender_id = c.contact_user_id 
          AND receiver_id = @userId 
          AND is_read = 0
        ) as unread_count
      FROM contacts c
      JOIN users u ON c.contact_user_id = u.user_id
      LEFT JOIN messages m ON 
        (m.sender_id = @userId AND m.receiver_id = c.contact_user_id)
        OR 
        (m.sender_id = c.contact_user_id AND m.receiver_id = @userId)
      WHERE c.user_id = @userId
      GROUP BY c.contact_user_id, u.user_handle, u.avatar_url
      ORDER BY last_message DESC
      `;
      const inputs = [{ name: "userId", type: db.Int, value: userId }];
      const result = await executeQuery(sqlQuery, inputs);
      res.json(result.recordset);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      res.status(500).json({ error: "Error al obtener contactos" });
    }
  };

// Obtener conversación con un contacto
const getConversation = async (req, res) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  try {
    const sqlQuery = `
      SELECT message_id, sender_id, receiver_id, content, sent_at, is_read
      FROM messages
      WHERE (sender_id = @userId AND receiver_id = @contactId)
         OR (sender_id = @contactId AND receiver_id = @userId)
      ORDER BY sent_at ASC
    `;
    const inputs = [
      { name: "userId", type: db.Int, value: userId },
      { name: "contactId", type: db.Int, value: contactId }
    ];
    const result = await executeQuery(sqlQuery, inputs);
    res.status(200).json({ conversation: result.recordset });
  } catch (error) {
    console.error("Error al obtener conversación:", error);
    res.status(500).json({ error: "Error interno al obtener conversación" });
  }
};

// Enviar mensaje y notificar en tiempo real
// const sendMessage = async (req, res) => {
//   const senderId = req.user.id;
//   const { receiverId, content } = req.body;

//   if (!receiverId || !content) {
//     return res.status(400).json({ error: "Faltan datos necesarios" });
//   }

//   try {
//     const sqlQuery = `
//       INSERT INTO messages (sender_id, receiver_id, content)
//       VALUES (@senderId, @receiverId, @content)
//     `;
//     const inputs = [
//       { name: "senderId", type: db.Int, value: senderId },
//       { name: "receiverId", type: db.Int, value: receiverId },
//       { name: "content", type: db.VarChar, value: content }
//     ];
//     await executeQuery(sqlQuery, inputs);

//     // Emitir notificación de mensaje utilizando Socket.io.
//     // Recupera la instancia de io desde el "app"
//     const io = req.app.get("socketio");
//     const message = { senderId, receiverId, content, sent_at: new Date() };
//     // Suponiendo que tienes un mecanismo para identificar el socket del receptor,
//     // podrías emitir el evento de forma personalizada, por ejemplo:
//     io.emit(`newMessage_${receiverId}`, message);

//     res.status(200).json({ success: true, message: "Mensaje enviado" });
//   } catch (error) {
//     console.error("Error al enviar mensaje:", error);
//     res.status(500).json({ error: "Error interno al enviar mensaje" });
//   }
// };

const sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId, content } = req.body;

  try {
    // Insertar mensaje
    const sqlQuery = `
      INSERT INTO messages (sender_id, receiver_id, content)
      OUTPUT inserted.*
      VALUES (@senderId, @receiverId, @content)
    `;
    const inputs = [
      { name: "senderId", type: db.Int, value: senderId },
      { name: "receiverId", type: db.Int, value: receiverId },
      { name: "content", type: db.VarChar, value: content }
    ];
    
    const result = await executeQuery(sqlQuery, inputs);
    const newMessage = result.recordset[0];

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    res.status(500).json({ error: "Error interno al enviar mensaje" });
  }
};

const getFollowedUsers = async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await executeQuery(
        `SELECT 
          u.user_id, 
          u.user_handle, 
          u.avatar_url,
          (
            SELECT COUNT(*) 
            FROM messages 
            WHERE sender_id = u.user_id 
            AND receiver_id = @userId 
            AND is_read = 0
          ) as unread_count
         FROM followers f
         JOIN users u ON f.following_id = u.user_id
         WHERE f.follower_id = @userId
         AND u.user_id NOT IN (
           SELECT contact_user_id FROM contacts WHERE user_id = @userId
         )`,
        [{ name: "userId", type: db.Int, value: userId }]
      );
      res.json(result.recordset);
    } catch (error) {
      console.error("Error al obtener seguidos:", error);
      res.status(500).json({ error: "Error al obtener seguidos" });
    }
  };

  const getUnreadCount = async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await executeQuery(
        `SELECT COUNT(*) as count 
         FROM messages 
         WHERE receiver_id = @userId AND is_read = 0`,
        [{ name: "userId", type: db.Int, value: userId }]
      );
      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error al obtener no leídos:", error);
      res.status(500).json({ error: "Error al obtener notificaciones" });
    }
  };  

  const getUnreadMessages = async (req, res) => {
    const userId = req.user.id;
    try {
      const result = await executeQuery(
        `SELECT 
          m.message_id,
          m.content,
          m.sent_at,
          u.user_id as sender_id,
          u.user_handle,
          u.avatar_url
         FROM messages m
         JOIN users u ON m.sender_id = u.user_id
         WHERE m.receiver_id = @userId AND m.is_read = 0
         ORDER BY m.sent_at DESC`,
        [{ name: "userId", type: db.Int, value: userId }]
      );
      res.json(result.recordset);
    } catch (error) {
      console.error("Error al obtener mensajes no leídos:", error);
      res.status(500).json({ error: "Error al obtener notificaciones" });
    }
  };

  const markAsRead = async (req, res) => {
    const userId = req.user.id;
    const { contactId } = req.params;
  
    try {
      await executeQuery(
        `UPDATE messages SET is_read = 1 
         WHERE receiver_id = @userId AND sender_id = @contactId AND is_read = 0`,
        [
          { name: "userId", type: db.Int, value: userId },
          { name: "contactId", type: db.Int, value: contactId }
        ]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error al marcar como leído:", error);
      res.status(500).json({ error: "Error al marcar mensajes como leídos" });
    }
  };

module.exports = {
  searchUser,
  addContact,
  getContacts,
  getConversation,
  sendMessage,
  getFollowedUsers,
  getUnreadCount,
  markAsRead,
  getUnreadMessages
};