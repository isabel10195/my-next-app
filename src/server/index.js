const express = require("express");
const cookieParser = require("cookie-parser");
const corsMiddleware = require("./middlewares/corsMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const followerRoutes = require("./routes/followerRoutes");
const communityRoutes = require("./routes/communityRoutes");
const storyRoutes = require("./routes/storyRoutes"); // 📌 Importamos las rutas de Stories
//const imageIARoutes = require("./routes/imageIARoutes");

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
app.use("/api/community", communityRoutes);
app.use("/api/stories", storyRoutes);
//app.use("/api/imagesIA", imageIARoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
