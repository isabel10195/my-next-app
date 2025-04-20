const express = require("express");
const { createStory, getFollowingStories } = require("../controllers/storyController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload, createStory);
router.get("/following", authMiddleware, getFollowingStories);

module.exports = router;