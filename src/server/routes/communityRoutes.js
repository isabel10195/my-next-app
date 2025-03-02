const express = require("express");
const { 
  getUserCommunities, 
  getExploreCommunities, 
  joinCommunity,
  getCategories
} = require("../controllers/communityController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Comunidades a las que pertenece el usuario
router.get("/user", authMiddleware, getUserCommunities);
// Comunidades disponibles para explorar
router.get("/explore", authMiddleware, getExploreCommunities);
// Unirse a una comunidad
router.post("/join", authMiddleware, joinCommunity);

router.get("/categories", authMiddleware, getCategories);

module.exports = router;