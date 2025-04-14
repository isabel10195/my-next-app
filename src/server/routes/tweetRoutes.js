const express = require("express");
const {
    createTweet,
    getTweets,
    getFollowingTweets,
    getTweetsByInterest,
    deleteTweet,
    editTweet,
    likeTweet,       
    createComment,
    getCommentsByTweet,
    toggleRetweet,
    getPopularTweets,
    getTweetsByUserHandle,
} = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');

// Rutas relacionadas con tweets
router.post("/create", authMiddleware, upload, createTweet); // Crear un tweet
router.get("/", authMiddleware, getTweets); // Obtener tweets del usuario
router.get("/following", authMiddleware, getFollowingTweets); // Obtener tweets de seguidos
router.get("/interest", authMiddleware, getTweetsByInterest); // Obtener tweets por intereses
router.post("/like", authMiddleware, likeTweet);     // Endpoint para like
router.delete("/delete/:tweet_id", authMiddleware, deleteTweet); // Eliminar tweet
router.put("/edit/:tweet_id", authMiddleware, editTweet); // Editar tweet
router.get("/:tweetId/comments", authMiddleware, getCommentsByTweet);
router.post("/:tweetId/comments", authMiddleware, createComment); // Endpoint para comentar
router.post("/retweet", authMiddleware, toggleRetweet); // Endpoint para retweet
router.get("/popular", getPopularTweets); // Nueva ruta para obtener tweets populares
router.get("/user/:handle", getTweetsByUserHandle);


module.exports = router;
