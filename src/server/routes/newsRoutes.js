const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getGeneralNews, getUserNews, getNewsByCategory} = require("../controllers/newsController");

// Noticias generales, sin autenticación requerida
router.get("/general", getGeneralNews);

// Noticias personalizadas según comunidades (requiere autenticación)
router.get("/user", authMiddleware, getUserNews);

router.get("/category/:category", authMiddleware, getNewsByCategory);

module.exports = router;