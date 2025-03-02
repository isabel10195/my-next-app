require("dotenv").config();

const express = require("express");
const {
    registerUser,
    loginUser,
    getUserProfile,
    logout,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const axios = require("axios");
const router = express.Router();

// Ruta para registrar usuarios
router.post("/create", registerUser);

// Rutas de autenticación
router.post("/login", loginUser); // Login de usuario
router.get("/profile", authMiddleware, getUserProfile); // Perfil del usuario autenticado
router.post("/logout", authMiddleware, logout); // Logout

// Rutas de autenticación spotify

router.get("/callback/spotify", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: "Authorization code missing" });
    }

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "http://localhost:3000/api/auth/callback/spotify",
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            }).toString(),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        const { access_token, refresh_token } = response.data;

        // Puedes guardar estos tokens en la sesión, BD o cookies
        res.json({ access_token, refresh_token });
    } catch (error) {
        console.error("Error al intercambiar el código por un token:", error);
        res.status(500).json({ error: "Error de autenticación con Spotify" });
    }
});

module.exports = router;

