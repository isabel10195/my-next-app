const db = require("../config/database");

exports.fetchStories = async (userId) => {
    try {
        const query = `
            SELECT 
                s.story_id, 
                s.image_url, 
                s.description, 
                s.created_at, 
                u.user_id, 
                u.user_handle, 
                u.avatar_url
            FROM stories s
            JOIN users u ON s.user_id = u.user_id
            JOIN followers f ON u.user_id = f.following_id
            WHERE f.follower_id = ?
            ORDER BY s.created_at DESC;
        `;

        const [rows] = await db.execute(query, [userId]);
        return rows;
    } catch (error) {
        throw new Error("Error al obtener las stories");
    }
};

exports.addStory = async (userId, imageUrl, description) => {
    try {
        const query = `
            INSERT INTO stories (user_id, image_url, description, created_at)
            VALUES (?, ?, ?, GETDATE());
        `;

        await db.execute(query, [userId, imageUrl, description]);
    } catch (error) {
        throw new Error("Error al insertar la story en la base de datos");
    }
};
