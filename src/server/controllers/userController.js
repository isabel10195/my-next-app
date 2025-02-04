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
const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const query = `
            SELECT category, detail_text
            FROM user_details
            WHERE user_id = @userId
        `;
        const inputs = [{ name: "userId", type: db.Int, value: userId }];
        const result = await executeQuery(query, inputs);

        if (result.recordset.length > 0) {
            const details = result.recordset.reduce((acc, row) => {
                acc[row.category] = acc[row.category] || [];
                acc[row.category].push(row.detail_text);
                return acc;
            }, {});
            res.send(details);
        } else {
            res.status(404).send("No se encontraron detalles para el usuario");
        }
    } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
        res.status(500).send("Error al obtener detalles del usuario");
    }
};

module.exports = { getUserData, getUserDetails };
