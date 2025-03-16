// src/server/controllers/newsletterController.js
const { executeQuery } = require("../config/database");
const db = require("mssql");

const subscribe = async (req, res) => {
  // Obtener el userId desde el token (asegúrate de que req.user incluya los datos necesarios)
  const userId = req.user.id;
  const { community_id } = req.body;

  try {
    // Verificar si ya está suscrito
    const checkQuery = `
      SELECT * FROM newsletter_subscriptions
      WHERE user_id = @userId AND community_id = @community_id
    `;
    const existing = await executeQuery(checkQuery, [
      { name: "userId", type: db.Int, value: userId },
      { name: "community_id", type: db.Int, value: community_id }
    ]);
    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: "Ya estás suscrito a esta comunidad" });
    }

    // Crear la suscripción
    const insertQuery = `
      INSERT INTO newsletter_subscriptions (user_id, community_id, created_at)
      VALUES (@userId, @community_id, GETDATE())
    `;
    await executeQuery(insertQuery, [
      { name: "userId", type: db.Int, value: userId },
      { name: "community_id", type: db.Int, value: community_id }
    ]);

    // Obtener el correo del usuario.
    // Primero se intenta obtenerlo del token; si no existe, se consulta en la BD.
    let userEmail = req.user.email_address; // Usar campo correcto del token
    if (!userEmail) {
      const emailQuery = `SELECT email_address FROM users WHERE user_id = @userId`;
      const emailResult = await executeQuery(emailQuery, [
        { name: "userId", type: db.Int, value: userId }
      ]);
      if (emailResult.recordset.length > 0) {
        userEmail = emailResult.recordset[0].email_address; // Acceder al campo correcto
      }
    }

    const newsQuery = `
      SELECT 
        category, 
        title, 
        subtitle, 
        summary, 
        link, 
        published_date AS date
      FROM news_articles
      WHERE community_id = @community_id
    `;

    const newsResult = await executeQuery(newsQuery, [
      { name: "community_id", type: db.Int, value: community_id }
    ]);

    const apiUrl = 'https://magicloops.dev/api/loop/ee80b4fd-3111-4068-99fe-46d7204dfd4d/run';

    // Mostrar datos que se enviarán
    console.log("Datos a enviar a la API externa:");
    console.log("Email:", userEmail);
    console.log("Artículos:", newsResult.recordset);

    for (const article of newsResult.recordset) {
      const bodyData = {
        email: userEmail,
        category: article.category,
        title: article.title,
        subtitle: article.subtitle,
        summary: article.summary,
        link: article.link,
        date: article.date.toISOString()
      };

      // Mostrar detalle de cada artículo
      console.log("Enviando artículo:", bodyData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      // Mostrar respuesta de la API
      const responseData = await response.json();
      console.log("Respuesta de la API:", responseData);
    }

    res.status(201).json({ message: "Suscripción exitosa" });
  } catch (error) {
    console.error("Error en subscribe:", error);
    res.status(500).json({ error: "Error del servidor al suscribirse" });
  }
};


const unsubscribe = async (req, res) => {
  const userId = req.user.id;
  const { community_id } = req.body;

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