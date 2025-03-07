const { executeQuery } = require("../config/database");
const db = require("mssql");

// 🔹 Seguir a un usuario
const followUser = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "No autenticado" });
    }
    const { follow_user_id } = req.body;
    const userId = req.user.id;

    try {
        const result = await executeQuery(
            "SELECT * FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
            [
                { name: "userId", type: db.Int, value: userId },
                { name: "follow_user_id", type: db.Int, value: follow_user_id },
            ]
        );

        if (result.recordset.length > 0) {
            return res.status(400).json({ error: "Ya sigues a este usuario" });
        }

        await executeQuery(
            "INSERT INTO followers (follower_id, following_id) VALUES (@userId, @follow_user_id)",
            [
                { name: "userId", type: db.Int, value: userId },
                { name: "follow_user_id", type: db.Int, value: follow_user_id },
            ]
        );

        const followedUsers = await executeQuery(
            "SELECT following_id, user_handle FROM followers JOIN users ON following_id = user_id WHERE follower_id = @userId",
            [{ name: "userId", type: db.Int, value: userId }]
        );

        res.json({ message: "Usuario seguido correctamente", followedUsers: followedUsers.recordset });
    } catch (error) {
        console.error("❌ Error al seguir al usuario:", error);
        res.status(500).json({ error: "Error al seguir al usuario" });
    }
};

// 🔹 Dejar de seguir a un usuario
const unfollowUser = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "No autenticado" });
    }
    const { follow_user_id } = req.body;
    const userId = req.user.id;

    try {
        const result = await executeQuery(
            "SELECT * FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
            [
                { name: "userId", type: db.Int, value: userId },
                { name: "follow_user_id", type: db.Int, value: follow_user_id },
            ]
        );

        if (result.recordset.length === 0) {
            return res.status(400).json({ error: "No estás siguiendo a este usuario" });
        }

        await executeQuery(
            "DELETE FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
            [
                { name: "userId", type: db.Int, value: userId },
                { name: "follow_user_id", type: db.Int, value: follow_user_id },
            ]
        );

        const followedUsers = await executeQuery(
            "SELECT following_id, user_handle FROM followers JOIN users ON following_id = user_id WHERE follower_id = @userId",
            [{ name: "userId", type: db.Int, value: userId }]
        );

        res.json({ message: "Usuario dejado de seguir correctamente", followedUsers: followedUsers.recordset });
    } catch (error) {
        console.error("❌ Error al dejar de seguir al usuario:", error);
        res.status(500).json({ error: "Error al dejar de seguir al usuario" });
    }
};

// 🔹 Obtener recomendaciones de usuarios para seguir
const getRecommendations = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "No autenticado" });
    }
    const userId = req.user.id;

    try {
        const query = `
            SELECT user_id, user_handle, avatar_url 
            FROM users 
            WHERE user_id NOT IN (SELECT following_id FROM followers WHERE follower_id = @userId)
            AND user_id != @userId 
            ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const results = await executeQuery(query, inputs);

        res.json({ recommendations: results.recordset });
    } catch (error) {
        console.error("❌ Error al obtener recomendaciones:", error);
        res.status(500).json({ error: "Error al obtener recomendaciones" });
    }
};

// 🔹 Obtener seguidores
// Obtener seguidores
const getFollowers = async (req, res) => {
    console.log("📥 Entrando a getFollowers...");

    if (!req.user || !req.user.id) {
        console.warn("❌ Usuario no autenticado en getFollowers");
        return res.status(401).json({ error: "No autenticado" });
    }

    const userId = req.user.id;

    try {
        const query = `
            SELECT users.user_id, users.user_handle, users.first_name, users.last_name, users.avatar_url
            FROM followers
            JOIN users ON followers.follower_id = users.user_id
            WHERE followers.following_id = @userId
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const results = await executeQuery(query, inputs);

        if (results.recordset.length === 0) {
            console.log("ℹ️ No se encontraron seguidores para este usuario.");
            return res.status(200).json({ followers: [] }); // 🔥 Devuelve array vacío en lugar de error
        }

        res.json({ followers: results.recordset });
    } catch (error) {
        console.error("❌ Error al obtener seguidores:", error);
        res.status(500).json({ error: "Error al obtener seguidores" });
    }
};


// 🔹 Obtener seguidos
const getFollowing = async (req, res) => {
    console.log("📥 Entrando a getFollowing...");
    if (!req.user || !req.user.id) {
        console.log("❌ Usuario no autenticado en getFollowing");
        return res.status(401).json({ error: "No autenticado" });
    }
    const userId = req.user.id;

    try {
        const query = `
            SELECT users.user_id, users.user_handle, users.first_name, users.last_name, users.avatar_url
            FROM followers
            JOIN users ON followers.following_id = users.user_id
            WHERE followers.follower_id = @userId
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const results = await executeQuery(query, inputs);

        if (results.recordset.length === 0) {
            console.log("ℹ️ No se encontraron seguidos para este usuario.");
            return res.status(200).json({ seguidos: [] });
        }

        res.json({ seguidos: results.recordset });
    } catch (error) {
        console.error("❌ Error al obtener seguidos:", error);
        res.status(500).json({ error: "Error al obtener seguidos" });
    }
};

module.exports = {
    followUser,
    unfollowUser,
    getRecommendations,
    getFollowers,
    getFollowing,
};
