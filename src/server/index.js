const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lure"
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // Permitir cookies y credenciales
}));

app.use(express.json());
app.use(cookieParser());

const SECRET_KEY = "lure"; // clave segura

// Registro de usuario
app.post("/create", async (req, res) => {
    const { user_handle, email_address, first_name, last_name, phone_number, password } = req.body;
    console.log(req.body); // Asegúrate de que todos los datos lleguen correctamente al backend

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            "INSERT INTO users (user_handle, email_address, first_name, last_name, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)",
            [user_handle, email_address, first_name, last_name, phone_number, hashedPassword],
            (err, result) => {
                if (err) {
                    console.log("Error SQL:", err); // Log para detalles
                    res.status(500).send("Error al registrar el usuario");
                } else {
                    res.send("Usuario registrado correctamente");
                }
            }
        );
    } catch (error) {
        console.log("Error backend:", error);
        res.status(500).send("Error al registrar el usuario");
    }
});

// Login de usuario
app.post("/login", (req, res) => {
    const { user_handle, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE user_handle = ?",
        [user_handle],
        async (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor");
            } else if (results.length === 0) {
                res.status(401).send("Usuario no encontrado");
            } else {
                const user = results[0];
                const validPassword = await bcrypt.compare(password, user.password);

                if (!validPassword) {
                    res.status(401).send("Contraseña incorrecta");
                } else {
                    const token = jwt.sign(
                        { id: user.user_id, user_handle: user.user_handle },
                        SECRET_KEY,
                        { expiresIn: "1h" }
                    );

                    // Enviar el token como cookie
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false, // Cambia a true si usas HTTPS
                        sameSite: "lax",
                    });

                    res.send("Login exitoso");
                }
            }
        }
    );
});

// Ruta protegida de ejemplo
app.get("/profile", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Token decodificado:", decoded); // Verifica la carga útil del token
        res.send(`Bienvenido, ${decoded.user_handle}`);
    } catch (err) {
        res.status(401).send("Token inválido");
    }
});

// Logout de usuario
app.post("/logout", (req, res) => {
    // Elimina la cookie del token
    res.clearCookie("token", { path: "/" }); // Asegúrate de que el path sea el mismo que se usó para configurarla
    res.send("Logout exitoso");
});

// Crear un nuevo tweet
app.post("/create-tweet", (req, res) => {
    const { tweet_text } = req.body;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user_id = decoded.id;

        db.query(
            "INSERT INTO tweets (user_id, tweet_text) VALUES (?, ?)",
            [user_id, tweet_text],
            (err, result) => {
                if (err) {
                    console.error("Error al crear el tweet:", err);
                    res.status(500).send("Error al crear el tweet");
                } else {
                    res.send({ message: "Tweet creado correctamente", tweetId: result.insertId });
                }
            }
        );
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).send("Token inválido");
    }
});

app.get("/get-tweets-seg", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        db.query(
            `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
                users.user_handle, users.first_name, users.last_name, users.avatar_url
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            JOIN followers ON followers.following_id = tweets.user_id
            WHERE followers.follower_id = ? 
            ORDER BY tweets.created_at DESC`,
            [userId],
            (err, results) => {
                if (err) {
                    console.error("Error al obtener tweets:", err);
                    return res.status(500).send("Error al obtener tweets");
                }

                res.send({ tweets: results });
            }
        );
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).send("Token inválido");
    }
});

app.get("/get-tweets", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        // Obtener los tweets del usuario autenticado (no de los usuarios que sigue)
        db.query(
            `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
                    user_handle, first_name, last_name, avatar_url 
            FROM tweets
            JOIN users ON tweets.user_id = users.user_id
            WHERE tweets.user_id = ?
            ORDER BY tweets.created_at DESC`,
            [userId], // Solo selecciona los tweets del usuario autenticado
            (err, results) => {
                if (err) {
                    console.error("Error al obtener los tweets del usuario:", err);
                    return res.status(500).send("Error al obtener tweets");
                }

                res.send({ tweets: results });
            }
        );
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).send("Token inválido");
    }
});

// Ruta para obtener los datos del usuario
app.get("/get-user-data", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        db.query(
            "SELECT first_name, last_name, user_handle, avatar_url FROM users WHERE user_id = ?",
            [userId],
            (err, result) => {
                if (err) {
                    console.error("Error al obtener datos del usuario:", err);
                    return res.status(500).send("Error al obtener datos del usuario");
                }

                const { first_name, last_name, user_handle, avatar_url } = result[0];
                res.send({
                first_name,
                last_name,
                user_handle,
                avatarUrl: avatar_url
                });

            }
        );
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).send("Token inválido");
    }
});

app.get("/get-following-tweets", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {   
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        db.query(
            `SELECT following_id FROM followers WHERE follower_id = ?`,
            [userId],
            (err, followingResults) => {
                if (err) {
                    console.error("Error al obtener usuarios seguidos:", err);
                    return res.status(500).send("Error al obtener usuarios seguidos");
                }

                const followingIds = followingResults.map(follow => follow.following_id);

                if (followingIds.length === 0) {
                    return res.send({ tweets: [] });
                }

                db.query(
                    `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, created_at, 
                        user_handle, first_name, last_name, avatar_url 
                    FROM tweets
                    JOIN users ON tweets.user_id = users.user_id
                    WHERE tweets.user_id IN (?)
                    ORDER BY created_at DESC`,
                    [followingIds],
                    (err, tweetResults) => {
                        if (err) {
                            console.error("Error al obtener tweets de los usuarios seguidos:", err);
                            return res.status(500).send("Error al obtener tweets");
                        }
                
                        console.log("Tweet Results: ", tweetResults); // Verifica si los resultados incluyen avatar_url y user_handle
                        res.send({ tweets: tweetResults });
                    }
                );                                            
            }
        );
    } catch (error) {
        console.error("Error al verificar token:", error);
        res.status(401).send("Token inválido");
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001"); 
});