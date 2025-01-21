const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sql = require("mssql");

const app = express();
const PORT = 3001;
const SECRET_KEY = "lure";

// Configuración para SQL Server
const dbConfig = {
    user: "root",    // Usuario de SQL Server
    password: "root",// Contraseña de SQL Server
    server: "localhost",  // Servidor SQL, "localhost" si es local
    database: "LURE",     // Nombre de tu base de datos
    port: 1433,           // Puerto predeterminado de SQL Server
    options: {
        encrypt: false,               // Cambia a true si usas Azure
        trustServerCertificate: true, // Para evitar errores con certificados locales
    },
};

// Crear pool de conexiones
const pool = new sql.ConnectionPool(dbConfig);
pool.connect()
    .then(() => console.log("Conexión exitosa a SQL Server"))
    .catch(err => console.error("Error al conectar con SQL Server:", err));

// Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // Permitir cookies y credenciales
}));
app.use(express.json());
app.use(cookieParser());

// Helper para ejecutar consultas SQL
async function executeQuery(query, inputs = []) {
    const request = pool.request();
    inputs.forEach(({ name, type, value }) => {
        request.input(name, type, value);
    });
    try {
        return await request.query(query);
    } catch (err) {
        console.error("Error al ejecutar consulta SQL:", err);
        throw err;
    }
}

// Rutas

// Registro de usuario
app.post("/create", async (req, res) => {
    const { user_handle, email_address, first_name, last_name, phone_number, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (user_handle, email_address, first_name, last_name, phone_number, password)
                       VALUES (@user_handle, @email_address, @first_name, @last_name, @phone_number, @password)`;

        await executeQuery(query, [
            { name: "user_handle", type: sql.NVarChar, value: user_handle },
            { name: "email_address", type: sql.NVarChar, value: email_address },
            { name: "first_name", type: sql.NVarChar, value: first_name },
            { name: "last_name", type: sql.NVarChar, value: last_name },
            { name: "phone_number", type: sql.NVarChar, value: phone_number },
            { name: "password", type: sql.NVarChar, value: hashedPassword },
        ]);

        res.send("Usuario registrado correctamente");
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send("Error al registrar el usuario");
    }
});

// Login de usuario
app.post("/login", async (req, res) => {
    const { user_handle, password } = req.body;

    try {
        const query = `SELECT * FROM users WHERE user_handle = @user_handle`;
        const result = await executeQuery(query, [
            { name: "user_handle", type: sql.NVarChar, value: user_handle },
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

        res.send("Login exitoso");
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta protegida: perfil del usuario
app.get("/profile", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.send(`Bienvenido, ${decoded.user_handle}`);
    } catch (err) {
        console.error("Error al verificar token:", err);
        res.status(401).send("Token inválido");
    }
});

// Logout de usuario
app.post("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.send("Logout exitoso");
});

// Crear un nuevo tweet
app.post("/create-tweet", async (req, res) => {
    const { tweet_text } = req.body;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user_id = decoded.id;

        const query = `INSERT INTO tweets (user_id, tweet_text) VALUES (@user_id, @tweet_text)`;
        await executeQuery(query, [
            { name: "user_id", type: sql.Int, value: user_id },
            { name: "tweet_text", type: sql.NVarChar, value: tweet_text },
        ]);

        res.send("Tweet creado correctamente");
    } catch (error) {
        console.error("Error al crear el tweet:", error);
        res.status(500).send("Error al crear el tweet");
    }
});

// Obtener tweets de usuarios seguidos
app.get("/get-following-tweets", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        const query = `
            SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, created_at, 
                   users.user_handle, users.first_name, users.last_name, users.avatar_url 
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            JOIN followers ON followers.following_id = tweets.user_id
            WHERE followers.follower_id = @userId
            ORDER BY tweets.created_at DESC`;

        const result = await executeQuery(query, [
            { name: "userId", type: sql.Int, value: userId },
        ]);

        res.send({ tweets: result.recordset });
    } catch (error) {
        console.error("Error al obtener tweets de usuarios seguidos:", error);
        res.status(500).send("Error al obtener tweets");
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
