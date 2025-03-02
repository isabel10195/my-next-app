const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const authMiddleware = require("../middlewares/authMiddleware");

// Obtener stories de usuarios seguidos
router.get("/", authMiddleware, storyController.getStories);

// Subir una nueva story
router.post("/", authMiddleware, storyController.createStory);

module.exports = router;
