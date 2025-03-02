const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/stories", authMiddleware, storyController.getStories);
router.post("/stories", authMiddleware, storyController.createStory);

module.exports = router;
