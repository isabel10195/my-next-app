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


module.exports = router;

