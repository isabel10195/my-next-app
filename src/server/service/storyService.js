const db = require("../config/database");

exports.fetchStories = async (userId) => {
    try {
        const query = `
            SELECT 
                s.story_id, 
                s.image_url, 
                COALESCE(s.description, '') AS description, -- Evita NULL en la descripción
                s.created_at, 
                u.user_id, 
                u.user_handle, 
                COALESCE(u.avatar_url, 'https://example.com/default-avatar.png') AS avatar_url -- Avatar por defecto si es NULL
            FROM stories s
            JOIN users u ON s.user_id = u.user_id
            JOIN followers f ON u.user_id = f.following_id
            WHERE f.follower_id = ?
            ORDER BY s.created_at DESC;
        `;

        const [rows] = await db.execute(query, [userId]);

        return rows.length > 0 ? rows : []; // Si no hay stories, devuelve un array vacío
    } catch (error) {
        console.error("❌ Error al obtener las stories:", error);
        throw new Error("Error al obtener las stories");
    }
};

exports.addStory = async (userId, imageUrl, description = "") => {
    try {
        const query = `
            INSERT INTO stories (user_id, image_url, description, created_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP);
        `;

        await db.execute(query, [userId, imageUrl, description]);
    } catch (error) {
        console.error("❌ Error al insertar la story en la base de datos:", error);
        throw new Error("Error al insertar la story en la base de datos");
    }
};
