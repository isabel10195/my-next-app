const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/admin/users", authMiddleware, adminController.getAllUsers);
router.get("/tweets/admin/all", authMiddleware, adminController.getAllTweets);
router.delete("/tweets/admin/:id", authMiddleware, adminController.deleteTweetById);

module.exports = router;
