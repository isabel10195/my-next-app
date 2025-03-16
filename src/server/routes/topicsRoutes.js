const express = require("express");
const router = express.Router();
const { fetchDynamicTopics } = require("../controllers/topicsController");

// Ruta para obtener topics dinámicos
router.get("/", fetchDynamicTopics);

module.exports = router;