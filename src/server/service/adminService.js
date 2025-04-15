
// const db = require("../config/database");

// exports.getAllUsers = async () => {
//   const [rows] = await db.execute("SELECT user_id, user_handle FROM users ORDER BY user_id DESC");
//   return rows;
// };

// exports.getAllTweets = async () => {
//   const [rows] = await db.execute(`
//     SELECT t.*, u.user_handle, u.avatar_url
//     FROM tweets t
//     JOIN users u ON t.user_id = u.user_id
//     ORDER BY t.created_at DESC
//   `);
//   return rows;
// };

// exports.deleteTweetById = async (tweetId) => {
//   await db.execute("DELETE FROM tweets WHERE tweet_id = ?", [tweetId]);
// };