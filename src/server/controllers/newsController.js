const { executeQuery } = require("../config/database");
const axios = require("axios");
const db = require("mssql");

/**
 * Obtiene las noticias generales (para usuarios no autenticados).
 */
const getGeneralNews = async (req, res) => {
  try {
    const query = `
      SELECT TOP 15 *
      FROM news_articles
      ORDER BY published_date DESC
    `;
    const result = await executeQuery(query);
    res.status(200).json({ news: result.recordset });
  } catch (error) {
    console.error("Error fetching general news:", error);
    res.status(500).json({ message: "Error fetching general news", error: error.message });
  }
};

/**
 * Obtiene las noticias personalizadas (para usuarios autenticados).
 * Se filtran las noticias según las categorías de las comunidades a las que el usuario se ha unido.
 */
const getUserNews = async (req, res) => {
  const userId = req.user.id; // Asegúrate que el middleware de autenticación coloque el usuario en req.user
  try {
    // Obtener las categorías de las comunidades en las que está el usuario
    const categoriesQuery = `
      SELECT DISTINCT c.category
      FROM community_members cm
      INNER JOIN communities c ON cm.community_id = c.community_id
      WHERE cm.user_id = @userId
    `;
    const categoriesResult = await executeQuery(categoriesQuery, [
      { name: "userId", type: db.Int, value: userId }
    ]);
    
    const categories = categoriesResult.recordset.map(row => row.category);

    let newsQuery = "";
    if (categories.length > 0) {
      // Usuario en comunidades: filtrar por categorías
      const categoriesString = categories.map(cat => `'${cat}'`).join(",");
      newsQuery = `
        SELECT *
        FROM news_articles
        WHERE category IN (${categoriesString})
        ORDER BY published_date DESC
      `;
      const newsResult = await executeQuery(newsQuery);
      res.status(200).json({ news: newsResult.recordset, noCommunity: false });
    } else {
      // Usuario sin comunidades: se muestran noticias generales y se indica el estado
      newsQuery = `
        SELECT TOP 15 *
        FROM news_articles
        ORDER BY published_date DESC
      `;
      const newsResult = await executeQuery(newsQuery);
      res.status(200).json({ news: newsResult.recordset, noCommunity: true });
    }

  } catch (error) {
    console.error("Error fetching user news:", error);
    res.status(500).json({ message: "Error fetching user news", error: error.message });
  }
};

/**
 * Actualiza las noticias diariamente.
 * Se conecta a una API externa, elimina las noticias actuales y luego inserta las nuevas.
 */
const updateDailyNews = async () => {
  try {
    // Reemplaza "URL_API_EXTERNA" por la URL real de tu API externa
    const response = await axios.get("https://magicloops.dev/api/loop/6743674f-6f2e-4738-8dd9-83b9d6ed76af/run?input=I+love+Magic+Loops%21");
    const newsData = response.data;
    
    // Eliminar todas las noticias existentes
    await executeQuery("DELETE FROM news_articles");
    
    // Insertar las nuevas noticias por cada categoría
    for (const category in newsData) {
      for (const article of newsData[category]) {
        // Extraer fecha del enlace (formato YYYY-MM-DD) o usar la fecha actual
        const dateMatch = article.enlace.match(/(\d{4}-\d{2}-\d{2})/);
        const publishedDate = dateMatch ? dateMatch[0] : new Date().toISOString().split("T")[0];
        
        const insertQuery = `
          INSERT INTO news_articles (category, title, subtitle, summary, link, published_date, image)
          VALUES (@category, @title, @subtitle, @summary, @link, @publishedDate, @image)
        `;
        const inputs = [
          { name: "category", type: db.NVarChar, value: category },
          { name: "title", type: db.NVarChar, value: article.titulo },
          { name: "subtitle", type: db.NVarChar, value: article.subtitulo },
          { name: "summary", type: db.NVarChar, value: article.resumen },
          { name: "link", type: db.NVarChar, value: article.enlace },
          { name: "publishedDate", type: db.Date, value: publishedDate },
          { 
            name: "image", 
            type: db.NVarChar, 
            value: article.imagen || 'https://ejemplo.com/default-image.jpg' 
          }
        ];
        await executeQuery(insertQuery, inputs);
      }
    }
    console.log("News updated successfully");
  } catch (error) {
    console.error("Error updating news:", error);
  }
};

module.exports = {
  getGeneralNews,
  getUserNews,
  updateDailyNews
};
