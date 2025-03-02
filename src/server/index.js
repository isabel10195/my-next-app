const express = require("express");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/corsMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followerRoutes = require("./routes/followerRoutes");


const app = express();
const PORT = 3001;
// Middlewares
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/followers", followerRoutes);


// Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


// // Configuración para SQL Server
// const dbConfig = {
//     user: "root",
//     password: "root",
//     server: "localhost",
//     database: "LURE",
//     port: 1433,
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     },
// };

// // Crear pool de conexiones
// let pool;
// (async function initializePool() {
//     try {
//         pool = await db.connect(dbConfig);
//         console.log("Conexión exitosa a SQL Server");
//     } catch (err) {
//         console.error("Error al conectar con SQL Server:", err);
//     }
// })();

// // Middlewares
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
// }));
// app.use(express.json());
// app.use(cookieParser());

// Helper para ejecutar consultas SQL
// async function executeQuery(query, inputs = []) {
//     if (!pool) {
//         pool = await db.connect(dbConfig);
//     }
//     const request = pool.request();
//     inputs.forEach(({ name, type, value }) => {
//         request.input(name, type, value);
//     });
//     try {
//         return await request.query(query);
//     } catch (err) {
//         console.error("Error al ejecutar consulta SQL:", err);
//         throw err;
//     }
// }

// Rutas

// Registro de usuario
// app.post("/create", async (req, res) => {
//     const { user_handle, email_address, first_name, last_name, phone_number, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const query = `INSERT INTO users (user_handle, email_address, first_name, last_name, phone_number, password)
//                        VALUES (@user_handle, @email_address, @first_name, @last_name, @phone_number, @password)`;

//         await executeQuery(query, [
//             { name: "user_handle", type: db.NVarChar, value: user_handle },
//             { name: "email_address", type: db.NVarChar, value: email_address },
//             { name: "first_name", type: db.NVarChar, value: first_name },
//             { name: "last_name", type: db.NVarChar, value: last_name },
//             { name: "phone_number", type: db.NVarChar, value: phone_number },
//             { name: "password", type: db.NVarChar, value: hashedPassword },
//         ]);

//         res.send("Usuario registrado correctamente");
//     } catch (error) {
//         console.error("Error al registrar el usuario:", error);
//         res.status(500).send("Error al registrar el usuario");
//     }
// });

// // Login de usuario
// app.post("/login", async (req, res) => {
//     const { user_handle, password } = req.body;

//     try {
//         const query = `SELECT * FROM users WHERE user_handle = @user_handle`;
//         const result = await executeQuery(query, [
//             { name: "user_handle", type: db.NVarChar, value: user_handle },
//         ]);

//         if (result.recordset.length === 0) {
//             return res.status(401).send("Usuario no encontrado");
//         }

//         const user = result.recordset[0];
//         const validPassword = await bcrypt.compare(password, user.password);

//         if (!validPassword) {
//             return res.status(401).send("Contraseña incorrecta");
//         }

//         const token = jwt.sign(
//             { id: user.user_id, user_handle: user.user_handle },
//             SECRET_KEY,
//             { expiresIn: "1h" }
//         );

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: false, // Cambia a true si usas HTTPS
//             sameSite: "lax",
//         });

//         res.send("Login exitoso");
//     } catch (error) {
//         console.error("Error en el login:", error);
//         res.status(500).send("Error en el servidor");
//     }
// });

// // Ruta protegida: perfil del usuario
// app.get("/profile", (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         res.send(`Bienvenido, ${decoded.user_handle}`);
//     } catch (err) {
//         console.error("Error al verificar token:", err);
//         res.status(401).send("Token inválido");
//     }
// });

// // Crear un nuevo tweet
// app.post("/create-tweet", async (req, res) => {
//     const { tweet_text } = req.body;
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const user_id = decoded.id;

//         const query = "INSERT INTO tweets (user_id, tweet_text) OUTPUT INSERTED.id VALUES (@user_id, @tweet_text)";
//         const inputs = [
//             { name: 'user_id', type: db.Int, value: user_id },
//             { name: 'tweet_text', type: db.NVarChar, value: tweet_text }
//         ];

//         const result = await executeQuery(query, inputs);

//         res.send({ message: "Tweet creado correctamente", tweetId: result.recordset[0].id });
//     } catch (error) {
//         console.error("Error al crear el tweet:", error);
//         res.status(500).send("Error al crear el tweet");
//     }
// });

// app.get("/get-tweets-seg", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const query = `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
//                         users.user_handle, users.first_name, users.last_name, users.avatar_url
//                     FROM tweets
//                     JOIN users ON tweets.user_id = users.user_id
//                     JOIN followers ON followers.following_id = tweets.user_id
//                     WHERE followers.follower_id = @userId 
//                     ORDER BY tweets.created_at DESC`;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const results = await executeQuery(query, inputs);

//         res.send({ tweets: results.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener tweets:", error);
//         res.status(500).send("Error al obtener tweets");
//     }
// });

// app.get("/get-tweets", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         // Obtener los tweets del usuario autenticado (no de los usuarios que sigue)
//         const query = `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, tweets.created_at, 
//                         user_handle, first_name, last_name, avatar_url 
//                     FROM tweets
//                     JOIN users ON tweets.user_id = users.user_id
//                     WHERE tweets.user_id = @userId
//                     ORDER BY tweets.created_at DESC`;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const results = await executeQuery(query, inputs);

//         res.send({ tweets: results.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener tweets:", error);
//         res.status(500).send("Error al obtener tweets");
//     }
// });

// app.get("/get-user-data", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const query = `
//             SELECT 
//                 u.first_name, 
//                 u.last_name, 
//                 u.user_handle, 
//                 u.avatar_url, 
//                 u.location, 
//                 u.date_of_birth, 
//                 u.email_address, 
//                 u.bio, 
//                 (SELECT COUNT(*) FROM followers WHERE following_id = @userId) AS followers,
//                 (SELECT COUNT(*) FROM followers WHERE follower_id = @userId) AS following
//             FROM users u
//             WHERE u.user_id = @userId
//         `;

//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const result = await executeQuery(query, inputs);

//         if (result.recordset.length > 0) {
//             const { 
//                 first_name, 
//                 last_name, 
//                 user_handle, 
//                 avatar_url, 
//                 location, 
//                 date_of_birth, 
//                 email_address, 
//                 bio, 
//                 followers, 
//                 following 
//             } = result.recordset[0];

//             res.send({
//                 first_name,
//                 last_name,
//                 user_handle,
//                 avatarUrl: avatar_url,
//                 location,
//                 date_of_birth,
//                 email_address,
//                 bio: bio,
//                 followers,
//                 following
//             });
//         } else {
//             res.status(404).send("Usuario no encontrado");
//         }
//     } catch (error) {
//         console.error("Error al verificar token o al obtener datos del usuario:", error);
//         res.status(500).send("Error al obtener datos del usuario");
//     }
// });

// app.get("/get-user-details", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         // Consulta para obtener logros, intereses y habilidades
//         const query = `
//             SELECT category, detail_text
//             FROM user_details
//             WHERE user_id = @userId
//         `;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const result = await executeQuery(query, inputs);

//         if (result.recordset.length > 0) {
//             const details = result.recordset.reduce((acc, row) => {
//                 acc[row.category] = acc[row.category] || [];
//                 acc[row.category].push(row.detail_text);
//                 return acc;
//             }, {});

//             res.send(details);
//         } else {
//             res.status(404).send("No se encontraron detalles para el usuario");
//         }
//     } catch (error) {
//         console.error("Error al obtener detalles del usuario:", error);
//         res.status(500).send("Error al obtener detalles del usuario");
//     }
// });


// app.get("/get-following-tweets", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {   
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const followingQuery = `SELECT following_id FROM followers WHERE follower_id = @userId`;
//         const followingInputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const followingResults = await executeQuery(followingQuery, followingInputs);

//         const followingIds = followingResults.recordset.map(follow => follow.following_id);

//         if (followingIds.length === 0) {
//             return res.send({ tweets: [] });
//         }

//         const tweetsQuery = `SELECT tweet_id, tweet_text, num_likes, num_retweets, num_comments, created_at, 
//                                 user_handle, first_name, last_name, avatar_url 
//                             FROM tweets
//                             JOIN users ON tweets.user_id = users.user_id
//                             WHERE tweets.user_id IN (${followingIds.join(',')})
//                             ORDER BY created_at DESC`;
//         const tweetsResults = await executeQuery(tweetsQuery);

//         res.send({ tweets: tweetsResults.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener tweets:", error);
//         res.status(500).send("Error al obtener tweets");
//     }
// });
// //-----------------------------------
// // Seguir usuario y devolver lista de seguidores y seguidos
// app.post("/follow-user", async (req, res) => {
//     const token = req.cookies.token;
//     const { follow_user_id } = req.body;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         // Verificar si el usuario ya sigue a este usuario
//         const result = await executeQuery(
//             "SELECT * FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//                 { name: 'follow_user_id', type: db.Int, value: follow_user_id },
//             ]
//         );

//         if (result.recordset.length > 0) {
//             // Ya sigue a este usuario, no hacer nada
//             return res.status(400).send("Ya sigues a este usuario");
//         }

//         // Si no sigue, proceder a insertarlo
//         await executeQuery(
//             "INSERT INTO followers (follower_id, following_id) VALUES (@userId, @follow_user_id)",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//                 { name: 'follow_user_id', type: db.Int, value: follow_user_id },
//             ]
//         );

//         // Actualizar la lista de seguidores y seguidos
//         const userResult = await executeQuery(
//             "SELECT user_id, user_handle, avatar_url FROM users WHERE user_id = @userId",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//             ]
//         );

//         // Lista de seguidos
//         const followedUsers = await executeQuery(
//             "SELECT following_id, user_handle FROM followers JOIN users ON following_id = user_id WHERE follower_id = @userId",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//             ]
//         );

//         res.send({
//             message: "Usuario seguido correctamente",
//             user: userResult.recordset[0],
//             followedUsers: followedUsers.recordset,
//         });
//     } catch (error) {
//         console.error("Error al verificar token o al seguir al usuario:", error);
//         res.status(500).send("Error al seguir al usuario");
//     }
// });

// // Dejar de seguir usuario y devolver lista de seguidores y seguidos
// app.post("/unfollow-user", async (req, res) => {
//     const token = req.cookies.token;
//     const { follow_user_id } = req.body;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         // Verificar si el usuario está siguiendo a este usuario
//         const result = await executeQuery(
//             "SELECT * FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//                 { name: 'follow_user_id', type: db.Int, value: follow_user_id },
//             ]
//         );

//         if (result.recordset.length === 0) {
//             // No sigue a este usuario, no hacer nada
//             return res.status(400).send("No estás siguiendo a este usuario");
//         }

//         // Si sigue, proceder a eliminarlo
//         await executeQuery(
//             "DELETE FROM followers WHERE follower_id = @userId AND following_id = @follow_user_id",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//                 { name: 'follow_user_id', type: db.Int, value: follow_user_id },
//             ]
//         );

//         // Actualizar la lista de seguidores y seguidos
//         const userResult = await executeQuery(
//             "SELECT user_id, user_handle, avatar_url FROM users WHERE user_id = @userId",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//             ]
//         );

//         // Lista de seguidos
//         const followedUsers = await executeQuery(
//             "SELECT following_id, user_handle FROM followers JOIN users ON following_id = user_id WHERE follower_id = @userId",
//             [
//                 { name: 'userId', type: db.Int, value: userId },
//             ]
//         );

//         res.send({
//             message: "Usuario dejado de seguir correctamente",
//             user: userResult.recordset[0],
//             followedUsers: followedUsers.recordset,
//         });
//     } catch (error) {
//         console.error("Error al verificar token o al dejar de seguir al usuario:", error);
//         res.status(500).send("Error al dejar de seguir al usuario");
//     }
// });
// //----------------------------------
// // Obtener recomendaciones de usuarios para seguir
// app.get("/recommendations", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const query = `SELECT user_id, user_handle, avatar_url 
//                         FROM users 
//                         WHERE user_id NOT IN (SELECT following_id FROM followers WHERE follower_id = @userId)
//                         AND user_id != @userId 
//                         ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const results = await executeQuery(query, inputs);

//         res.send({ recommendations: results.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener recomendaciones:", error);
//         res.status(500).send("Error al obtener recomendaciones");
//     }
// });
// //---------------------------------------------------------------------------------estas aqui

// // Obtener seguidores
// app.get("/followers", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const query = `SELECT users.user_id, users.user_handle, users.first_name, users.last_name, users.avatar_url
//                        FROM followers
//                        JOIN users ON followers.follower_id = users.user_id
//                        WHERE followers.following_id = @userId`;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const results = await executeQuery(query, inputs);

//         console.log("Datos de seguidores:", results); // Verifica los datos
//         res.send({ seguidores: results.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener seguidores:", error);
//         res.status(500).send("Error al obtener seguidores");
//     }
// });

// // Obtener seguidos
// app.get("/following", async (req, res) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).send("No autorizado");
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         const query = `SELECT users.user_id, users.user_handle, users.first_name, users.last_name, users.avatar_url
//                        FROM followers
//                        JOIN users ON followers.following_id = users.user_id
//                        WHERE followers.follower_id = @userId`;
//         const inputs = [
//             { name: 'userId', type: db.Int, value: userId }
//         ];

//         const results = await executeQuery(query, inputs);

//         console.log("Datos de seguidos:", results); // Verifica los datos
//         res.send({ seguidos: results.recordset });
//     } catch (error) {
//         console.error("Error al verificar token o al obtener seguidos:", error);
//         res.status(500).send("Error al obtener seguidos");
//     }
// });


// // Eliminar tweet
// app.delete('/delete-tweet/:tweet_id', async (req, res) => {
//     const tweetId = req.params.tweet_id;
//     const token = req.cookies.token;

//     console.log('Tweet ID:', tweetId);
//     console.log('Token:', token);

//     if (!token) {
//         return res.status(401).json({ message: 'No autorizado' });
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         const userId = decoded.id;

//         console.log('User ID:', userId);

//         const result = await executeQuery(
//             'DELETE FROM tweets WHERE tweet_id = @tweetId AND user_id = @userId',
//             [
//                 { name: 'tweetId', type: db.Int, value: tweetId },
//                 { name: 'userId', type: db.Int, value: userId }
//             ]
//         );

//         console.log('Delete result:', result);

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: 'Tweet eliminado correctamente' });
//         } else {
//             res.status(404).json({ message: 'Tweet no encontrado o no autorizado' });
//         }
//     } catch (error) {
//         console.error('Error al eliminar el tweet:', error);
//         res.status(500).json({ message: 'Error al eliminar el tweet', error: error.message });
//     }
// });

// // Editar tweet
// app.put('/edit-tweet/:tweet_id', async (req, res) => {
//     const { tweet_id } = req.params;
//     const { tweet_text } = req.body;

//     try {
//         await executeQuery(
//             'UPDATE tweets SET tweet_text = @tweet_text WHERE tweet_id = @tweet_id',
//             [
//                 { name: 'tweet_text', type: db.NVarChar, value: tweet_text },
//                 { name: 'tweet_id', type: db.Int, value: tweet_id }
//             ]
//         );
//         res.status(200).json({ message: 'Tweet actualizado correctamente' });
//     } catch (error) {
//         console.error('Error al actualizar el tweet:', error);
//         res.status(500).json({ message: 'Error al actualizar el tweet', error: error.message });
//     }
// });

// // Logout de usuario
// app.post("/logout", (req, res) => {
//     res.clearCookie("token", { path: "/" });
//     res.send("Logout exitoso");
// });

// // Iniciar servidor
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto ${PORT}`);
// });