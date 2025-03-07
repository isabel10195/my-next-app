const express = require("express");
const {
    followUser,
    unfollowUser,
    getRecommendations,
    getFollowers,
    getFollowing,
} = require("../controllers/followerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas para gestionar seguidores
router.get("/", authMiddleware, getFollowers); // Obtener seguidores
router.post("/follow", authMiddleware, followUser); // Seguir a un usuario
router.post("/unfollow", authMiddleware, unfollowUser); // Dejar de seguir a un usuario
router.get("/recommendations", authMiddleware, getRecommendations); // Obtener recomendaciones
router.get("/following", authMiddleware, getFollowing); // Obtener seguidos

module.exports = router;
