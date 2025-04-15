const { executeQuery } = require("../config/database");
const db = require("mssql");

// Obtener datos básicos del usuario
const getUserData = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `
            SELECT 
                u.first_name, 
                u.last_name, 
                u.user_handle, 
                u.avatar_url,
                u.cover_url, 
                u.location, 
                u.date_of_birth, 
                u.email_address, 
                u.bio, 
                (SELECT COUNT(*) FROM followers WHERE following_id = @userId) AS followers,
                (SELECT COUNT(*) FROM followers WHERE follower_id = @userId) AS following
            FROM users u
            WHERE u.user_id = @userId
        `;

        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const result = await executeQuery(query, inputs);

        if (result.recordset.length > 0) {
            res.send(result.recordset[0]);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).send("Error al obtener datos del usuario");
    }
};

// Obtener detalles adicionales del usuario
const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("📡 Buscando detalles del usuario en la base de datos:", userId);

        const query = `
            SELECT category, detail_text
            FROM user_details
            WHERE user_id = @userId
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const result = await executeQuery(query, inputs);

        if (result.recordset.length > 0) {
            const details = result.recordset.reduce((acc, row) => {
                const key = row.category.toLowerCase();
                acc[key] = acc[key] || [];
                acc[key].push(row.detail_text);
                return acc;
            }, {});

            console.log("✅ Datos del usuario obtenidos correctamente:", details);
            res.status(200).json(details);
        } else {
            console.warn("⚠️ Usuario sin detalles en la base de datos:", userId);
            res.status(200).json({ logros: [] });
        }
    } catch (error) {
        console.error("❌ Error al obtener detalles del usuario:", error);
        res.status(500).json({ error: "Error al obtener detalles del usuario" });
    }
};

// Añadir un detalle (interés, habilidad, etc.)
const updateUserDetail = async (req, res) => {
    const userId = req.user.id;
    const { category, detail_text } = req.body;

    if (!category || !detail_text) {
        return res.status(400).json({ error: "Faltan datos necesarios" });
    }

    try {
        const query = `
            INSERT INTO user_details (user_id, category, detail_text)
            VALUES (@userId, @category, @detailText)
        `;

        const inputs = [
            { name: "userId", type: db.Int, value: userId },
            { name: "category", type: db.VarChar, value: category },
            { name: "detailText", type: db.VarChar, value: detail_text },
        ];

        await executeQuery(query, inputs);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("❌ Error al insertar detalle:", error);
        res.status(500).json({ error: "Error interno al insertar detalle" });
    }
};

// Eliminar un detalle
const deleteUserDetail = async (req, res) => {
    const userId = req.user.id;
    const { category, detail_text } = req.body;

    if (!category || !detail_text) {
        return res.status(400).json({ error: "Faltan datos para eliminar" });
    }

    try {
        const query = `
            DELETE FROM user_details
            WHERE user_id = @userId AND category = @category AND detail_text = @detailText
        `;

        const inputs = [
            { name: "userId", type: db.Int, value: userId },
            { name: "category", type: db.VarChar, value: category },
            { name: "detailText", type: db.VarChar, value: detail_text },
        ];

        await executeQuery(query, inputs);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("❌ Error al eliminar detalle:", error);
        res.status(500).json({ error: "Error interno al eliminar detalle" });
    }
};
// 🔹 Obtener datos del usuario por su `handle` (para perfil público)
const getUserByHandle = async (req, res) => {
  const { handle } = req.params;

  try {
    const query = `
      SELECT 
        u.user_id,
        u.first_name, 
        u.last_name, 
        u.user_handle, 
        u.avatar_url,
        u.cover_url, 
        u.location, 
        u.date_of_birth, 
        u.email_address, 
        u.bio, 
        (SELECT COUNT(*) FROM followers WHERE following_id = u.user_id) AS followers,
        (SELECT COUNT(*) FROM followers WHERE follower_id = u.user_id) AS following
      FROM users u
      WHERE u.user_handle = @handle
    `;

    const inputs = [{ name: "handle", type: db.VarChar, value: handle }];
    const result = await executeQuery(query, inputs);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error al obtener usuario por handle:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 Obtener detalles por handle
const getUserDetailsByHandle = async (req, res) => {
  const { handle } = req.params;

  try {
    const queryUserId = `
      SELECT user_id FROM users WHERE user_handle = @handle
    `;
    const resultUserId = await executeQuery(queryUserId, [
      { name: "handle", type: db.VarChar, value: handle },
    ]);

    if (resultUserId.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userId = resultUserId.recordset[0].user_id;

    const query = `
      SELECT category, detail_text
      FROM user_details
      WHERE user_id = @userId
    `;
    const inputs = [{ name: "userId", type: db.Int, value: userId }];
    const result = await executeQuery(query, inputs);

    const details = result.recordset.reduce((acc, row) => {
      const key = row.category.toLowerCase();
      acc[key] = acc[key] || [];
      acc[key].push(row.detail_text);
      return acc;
    }, {});

    return res.status(200).json(details);
  } catch (error) {
    console.error("❌ Error al obtener detalles del usuario por handle:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Exportar controladores
// 🔹 Exportar funciones para su uso en rutas
  module.exports = {
    getUserData,
    getUserDetails,
    updateUserDetail,
    deleteUserDetail,
    getUserByHandle,
    getUserDetailsByHandle,
  };
  
