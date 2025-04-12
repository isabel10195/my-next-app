const { executeQuery } = require("../config/database");
const db = require("mssql");

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

module.exports = {
  getAllUsers,
  getAllTweets,
  deleteTweetById
};
