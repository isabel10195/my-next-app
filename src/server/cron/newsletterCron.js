const nodemailer = require("nodemailer");
const cron = require("node-cron");
const db = require("mssql");
const { executeQuery } = require("../config/database");

// Configuración del transportador de correos
const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: "aminbouali13@gmail.com", // Reemplaza con tu correo
    pass: "Aaminbou1303+!", // Reemplaza con tu contraseña o API key
  },
});

// Cron job para enviar newsletters cada día a las 8 AM
cron.schedule("0 8 * * *", async () => {
  console.log("Ejecutando envío de newsletters...");
  try {
    // 1. Obtener todas las suscripciones
    const subsResult = await executeQuery("SELECT * FROM newsletter_subscriptions");
    const subscriptions = subsResult.recordset;

    for (const sub of subscriptions) {
      // 2. Obtener el email del usuario
      const userResult = await executeQuery(
        "SELECT email_address FROM users WHERE user_id = @userId",
        [{ name: "userId", type: db.Int, value: sub.user_id }]
      );
      const userEmail = userResult.recordset[0]?.email_address;
      if (!userEmail) continue;

      // 3. Obtener noticias para la comunidad (filtrando por categoría de la comunidad)
      const newsResult = await executeQuery(
        `SELECT TOP 5 * 
         FROM news_articles 
         WHERE category = (
           SELECT category FROM communities WHERE community_id = @communityId
         )
         ORDER BY published_date DESC`,
        [{ name: "communityId", type: db.Int, value: sub.community_id }]
      );
      const newsArticles = newsResult.recordset;

      // 4. Construir el contenido HTML del email
      let emailBody = `<h1>Noticias de tu comunidad</h1>`;
      newsArticles.forEach(article => {
        emailBody += `
          <h2>${article.title}</h2>
          <p>${article.summary}</p>
          <a href="${article.link}">Leer más</a>
          <hr/>
        `;
      });

      // 5. Enviar el correo electrónico
      await transporter.sendMail({
        from: '"LURE News" <aminbouali13@gmail.com>',
        to: userEmail,
        subject: "Actualización de noticias",
        html: emailBody,
      });
    }
    console.log("Correos enviados correctamente.");
  } catch (error) {
    console.error("Error enviando newsletters:", error);
  }
});