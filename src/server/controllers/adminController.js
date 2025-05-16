const { executeQuery } = require("../config/database");
const db = require("mssql");
const PDFDocument = require("pdfkit");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const result = await executeQuery(`
      SELECT user_id, user_handle, avatar_url FROM users ORDER BY user_id DESC
    `);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Obtener todos los tweets
const getAllTweets = async (req, res) => {
  try {
    const query = `
      SELECT t.tweet_id, t.tweet_text, t.media_urls, t.num_likes, t.num_retweets, 
             t.num_comments, t.created_at, u.user_handle, u.avatar_url
      FROM tweets t
      JOIN users u ON t.user_id = u.user_id
      ORDER BY t.created_at DESC
    `;
    const result = await executeQuery(query);
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener tweets:", error);
    res.status(500).json({ message: "Error al obtener tweets" });
  }
};

// Eliminar tweet por ID
const deleteTweetById = async (req, res) => {
  const tweetId = req.params.id;

  try {
    await executeQuery("DELETE FROM tweets WHERE tweet_id = @tweetId", [
      { name: "tweetId", type: db.Int, value: tweetId }
    ]);
    res.status(200).json({ message: "Tweet eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar tweet:", error);
    res.status(500).json({ message: "Error al eliminar tweet" });
  }
};

// Eliminar usuario por ID
const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    // Eliminar primero los registros relacionados
    await executeQuery("DELETE FROM user_details WHERE user_id = @userId", [
      { name: "userId", type: db.Int, value: userId }
    ]);

    // Luego eliminar al usuario
    await executeQuery("DELETE FROM users WHERE user_id = @userId", [
      { name: "userId", type: db.Int, value: userId }
    ]);

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};


// Descargar PDF con datos del usuario
const exportUserDataToPDF = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await executeQuery(
      `SELECT * FROM users WHERE user_id = @userId`,
      [{ name: "userId", type: db.Int, value: userId }]
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.recordset[0];
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=usuario_${userId}.pdf`);
    doc.pipe(res);

    doc.fontSize(16).text(`Datos del Usuario ${user.user_handle}`, { underline: true });
    doc.moveDown();

    Object.entries(user).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`);
    });

    doc.end();
  } catch (error) {
    console.error("❌ Error al exportar datos del usuario:", error);
    res.status(500).json({ message: "Error al exportar datos del usuario" });
  }
};

module.exports = {
  getAllUsers,
  getAllTweets,
  deleteTweetById,
  deleteUserById,
  exportUserDataToPDF
};
