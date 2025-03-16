// src/server/controllers/newsletterController.js
const { executeQuery } = require("../config/database");
const db = require("mssql");
const fetch = require("node-fetch");
const querystring = require('querystring'); 

// const subscribe = async (req, res) => {
//   const userId = req.user.id;
//   const { community_id } = req.body;

//   try {
//     // Verificar si ya está suscrito
//     const checkQuery = `
//       SELECT * FROM newsletter_subscriptions
//       WHERE user_id = @userId AND community_id = @community_id
//     `;
//     const existing = await executeQuery(checkQuery, [
//       { name: "userId", type: db.Int, value: userId },
//       { name: "community_id", type: db.Int, value: community_id }
//     ]);
//     if (existing.recordset.length > 0) {
//       return res.status(400).json({ error: "Ya estás suscrito a esta comunidad" });
//     }

//     // Crear la suscripción (solo inserción en la tabla)
//     const insertQuery = `
//       INSERT INTO newsletter_subscriptions (user_id, community_id, created_at)
//       VALUES (@userId, @community_id, GETDATE())
//     `;
//     await executeQuery(insertQuery, [
//       { name: "userId", type: db.Int, value: userId },
//       { name: "community_id", type: db.Int, value: community_id }
//     ]);


//     res.status(201).json({ message: "Suscripción exitosa" });
//   } catch (error) {
//     console.error("Error en subscribe:", error);
//     res.status(500).json({ error: "Error del servidor al suscribirse" });
//   }
// };

const subscribe = async (req, res) => {
  const userId = req.user.id;
  const { community_id } = req.body;

  try {
    // Verificar suscripción existente
    const existing = await executeQuery(
      `SELECT * FROM newsletter_subscriptions
       WHERE user_id = @userId AND community_id = @community_id`,
      [
        { name: "userId", type: db.Int, value: userId },
        { name: "community_id", type: db.Int, value: community_id }
      ]
    );

    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: "Ya estás suscrito a esta comunidad" });
    }

    // Crear suscripción
    await executeQuery(
      `INSERT INTO newsletter_subscriptions (user_id, community_id, created_at)
       VALUES (@userId, @community_id, GETDATE())`,
      [
        { name: "userId", type: db.Int, value: userId },
        { name: "community_id", type: db.Int, value: community_id }
      ]
    );

    // Obtener email del usuario
    const userResult = await executeQuery(
      "SELECT email_address FROM users WHERE user_id = @userId",
      [{ name: "userId", type: db.Int, value: userId }]
    );
    
    if (userResult.recordset.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    const userEmail = userResult.recordset[0].email_address;

    // Obtener noticias de la comunidad
    const newsResult = await executeQuery(
      `SELECT n.title, n.subtitle, n.summary, n.link, n.published_date, c.category 
       FROM news_articles n
       JOIN communities c ON n.community_id = c.community_id
       WHERE n.community_id = @community_id`,
      [{ name: "community_id", type: db.Int, value: community_id }]
    );

    for (const news of newsResult.recordset) {
      try {
        const payload = {
          email: userEmail,
          category: news.category,
          title: news.title,
          subtitle: news.subtitle || '',
          summary: news.summary,
          link: news.link,
          date: new Date(news.published_date).toISOString()
        };

        const url = 'https://magicloops.dev/api/loop/ee80b4fd-3111-4068-99fe-46d7204dfd4d/run';

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const responseData = await response.json();
        console.log(`Respuesta de la API para ${news.title}:`, responseData);

        if (!response.ok) {
          console.error(`Error en noticia ${news.title}: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error al enviar noticia ${news.title}: ${error.message}`);
      }
    }

    res.status(201).json({ message: "Suscripción exitosa" });
  } catch (error) {
    console.error("Error en subscribe:", error);
    res.status(500).json({ error: "Error del servidor al suscribirse" });
  }
};

const unsubscribe = async (req, res) => {
  const userId = req.user.id;
  const community_id = Number(req.body.community_id);

  if (!community_id || isNaN(community_id)) {
    return res.status(400).json({ error: "ID de comunidad inválido" });
  }

  try {
    const deleteQuery = `
      DELETE FROM newsletter_subscriptions
      WHERE user_id = @userId AND community_id = @community_id
    `;

    const result = await executeQuery(deleteQuery, [
      { name: "userId", type: db.Int, value: userId },
      { name: "community_id", type: db.Int, value: community_id }
    ]);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Suscripción no encontrada" });
    }

    res.json({ message: "Desuscripción exitosa" });
  } catch (error) {
    console.error("Error en unsubscribe:", error);
    res.status(500).json({ error: "Error del servidor al desuscribirse" });
  }
};

const getSubscriptions = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT c.community_id, c.name, c.category
      FROM newsletter_subscriptions ns
      JOIN communities c ON ns.community_id = c.community_id
      WHERE ns.user_id = @userId
    `;

    const result = await executeQuery(query, [
      { name: "userId", type: db.Int, value: userId }
    ]);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error obteniendo suscripciones:", error);
    res.status(500).json({ error: "Error obteniendo suscripciones" });
  }
};

module.exports = { subscribe, unsubscribe, getSubscriptions };