const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { executeQuery } = require("../config/database");
const db = require("mssql");

const SECRET_KEY = "lure";

// Registro de usuario
const registerUser = async (req, res) => {
    console.log("📩 Registro solicitado:", req.body); // Log del cuerpo recibido

    const { user_handle, email_address, first_name, last_name, phone_number, password } = req.body;

    try {
        // 🔍 Comprobamos si el usuario ya existe
        const checkQuery = `
            SELECT * FROM users 
            WHERE user_handle = @user_handle OR email_address = @email_address OR phone_number = @phone_number
        `;
        const existingUser = await executeQuery(checkQuery, [
            { name: "user_handle", type: db.NVarChar, value: user_handle },
            { name: "email_address", type: db.NVarChar, value: email_address },
            { name: "phone_number", type: db.NVarChar, value: phone_number },
        ]);

        if (existingUser.recordset.length > 0) {
            console.error("❌ Error: Usuario ya registrado.");
            return res.status(400).json({
                error: "El nombre de usuario, email o número de teléfono ya están en uso.",
            });
        }

        // 🔑 Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Contraseña cifrada:", hashedPassword);

        // 🚀 Insertar usuario en la BD
        const insertQuery = `
            INSERT INTO users (user_handle, email_address, first_name, last_name, phone_number, password, created_at)
            VALUES (@user_handle, @email_address, @first_name, @last_name, @phone_number, @password, GETDATE())
        `;

        await executeQuery(insertQuery, [
            { name: "user_handle", type: db.NVarChar, value: user_handle },
            { name: "email_address", type: db.NVarChar, value: email_address },
            { name: "first_name", type: db.NVarChar, value: first_name },
            { name: "last_name", type: db.NVarChar, value: last_name },
            { name: "phone_number", type: db.NVarChar, value: phone_number },
            { name: "password", type: db.NVarChar, value: hashedPassword },
        ]);

        console.log("✅ Usuario registrado correctamente");
        res.status(201).json({ message: "✅ Registro exitoso. Ahora puedes iniciar sesión." });

    } catch (error) {
        console.error("❌ Error al registrar el usuario:", error);
        res.status(500).json({ error: "❌ Error en el servidor al registrar el usuario." });
    }
};



const loginUser = async (req, res) => {
    const { user_handle, password } = req.body;

    try {
        const query = `SELECT * FROM users WHERE user_handle = @user_handle`;
        const result = await executeQuery(query, [
            { name: "user_handle", type: db.NVarChar, value: user_handle },
        ]);

        if (result.recordset.length === 0) {
            return res.status(401).send("Usuario no encontrado");
        }

        const user = result.recordset[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).send("Contraseña incorrecta");
        }

        const token = jwt.sign(
            { id: user.user_id, user_handle: user.user_handle },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Cambia a true si usas HTTPS
            sameSite: "lax",
        });

        // 🔥 Guardar el último inicio de sesión en la base de datos
        const updateLastLoginQuery = `
            UPDATE users SET last_login = GETDATE() WHERE user_id = @user_id
        `;
        await executeQuery(updateLastLoginQuery, [
            { name: "user_id", type: db.Int, value: user.user_id },
        ]);

        res.send("Login exitoso");
    } catch (error) {
        console.error("❌ Error en el login:", error);
        res.status(500).send("Error en el servidor");
    }
};


// Perfil del usuario
const getUserProfile = async (req, res) => {
    try {
        const query = `
            SELECT user_id, user_handle, email_address, first_name, last_name, 
                   avatar_url, cover_url, last_login, user_role
            FROM users WHERE user_id = @user_id`; // 🔥 Agregado cover_url aquí

        const result = await executeQuery(query, [
            { name: "user_id", type: db.Int, value: req.user.id },
        ]);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = result.recordset[0];

        res.json({
            user_id: user.user_id,
            user_handle: user.user_handle,
            email: user.email_address,
            name: `${user.first_name} ${user.last_name}`,
            avatarUrl: user.avatar_url || null,
            coverUrl: user.cover_url || null, // 🔥 Ahora envía la portada al frontend
            lastLogin: user.last_login,
            isOnline: true,
            role: user.user_role,
        });
    } catch (error) {
        console.error("❌ Error obteniendo perfil:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};





// Logout de usuario
const logout = (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.send("Logout exitoso");
};

module.exports = { registerUser, loginUser, getUserProfile, logout };
