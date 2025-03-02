const express = require("express");
const { getUserData, getUserDetails } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas relacionadas con usuarios
router.get("/data", authMiddleware, getUserData);        // Obtener datos básicos del usuario
router.get("/details", authMiddleware, getUserDetails); // Obtener detalles adicionales del usuario

module.exports = router;
