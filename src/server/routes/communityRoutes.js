const express = require("express");
const { 
  getUserCommunities, 
  getExploreCommunities, 
  joinCommunity,
  leaveCommunity,
  getCategories,
  getPopularCommunities
} = require("../controllers/communityController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Comunidades a las que pertenece el usuario
router.get("/user", authMiddleware, getUserCommunities);
// Comunidades disponibles para explorar
router.get("/explore", authMiddleware, getExploreCommunities);
// Unirse a una comunidad
router.post("/join", authMiddleware, joinCommunity);
//Salir de comunidades
router.post("/leave", authMiddleware, leaveCommunity);

router.get("/categories", authMiddleware, getCategories);

router.get("/popular", getPopularCommunities);

module.exports = router;