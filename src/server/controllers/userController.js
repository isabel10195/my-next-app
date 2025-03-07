const { executeQuery } = require("../config/database");
const db = require("mssql");

// Obtener datos básicos del usuario
const getUserData = async (req, res) => {
    const userId = req.user.id; // Obtenido del middleware de autenticación

    try {
        const query = `
            SELECT 
                u.first_name, 
                u.last_name, 
                u.user_handle, 
                u.avatar_url,
                u.cover_url, 
                u.location, 
                u.date_of_birth, 
                u.email_address, 
                u.bio, 
                (SELECT COUNT(*) FROM followers WHERE following_id = @userId) AS followers,
                (SELECT COUNT(*) FROM followers WHERE follower_id = @userId) AS following
            FROM users u
            WHERE u.user_id = @userId
        `;

        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const result = await executeQuery(query, inputs);

        if (result.recordset.length > 0) {
            res.send(result.recordset[0]);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).send("Error al obtener datos del usuario");
    }
};

// Obtener detalles adicionales del usuario
// Obtener detalles adicionales del usuario
const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("📡 Buscando detalles del usuario en la base de datos:", userId);

        const query = `
            SELECT category, detail_text
            FROM user_details
            WHERE user_id = @userId
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const result = await executeQuery(query, inputs);

        if (result.recordset.length > 0) {
            const details = result.recordset.reduce((acc, row) => {
                const key = row.category.toLowerCase(); // Convertir a minúsculas
                acc[key] = acc[key] || [];
                acc[key].push(row.detail_text);
                return acc;
            }, {});

            console.log("✅ Datos del usuario obtenidos correctamente:", details);
            res.status(200).json(details);
        } else {
            console.warn("⚠️ Usuario sin detalles en la base de datos:", userId);
            res.status(200).json({ logros: [] }); // 🔹 Ahora el frontend recibirá un array vacío en lugar de un error
        }
    } catch (error) {
        console.error("❌ Error al obtener detalles del usuario:", error);
        res.status(500).json({ error: "Error al obtener detalles del usuario" });
    }
};

module.exports = { getUserData, getUserDetails };
