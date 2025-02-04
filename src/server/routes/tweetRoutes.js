const express = require("express");
const {
    createTweet,
    getTweets,
    getFollowingTweets,
    deleteTweet,
    editTweet,
} = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas relacionadas con tweets
router.post("/create", authMiddleware, createTweet); // Crear un tweet
router.get("/", authMiddleware, getTweets); // Obtener tweets del usuario
router.get("/following", authMiddleware, getFollowingTweets); // Obtener tweets de seguidos
router.delete("/delete/:tweet_id", authMiddleware, deleteTweet); // Eliminar tweet
router.put("/edit/:tweet_id", authMiddleware, editTweet); // Editar tweet

module.exports = router;
