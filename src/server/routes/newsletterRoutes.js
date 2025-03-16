const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  subscribe,
  unsubscribe,
  getSubscriptions
} = require("../controllers/newsletterController");

// Suscripción a newsletter
router.post("/subscribe", authMiddleware, subscribe);

// Desuscripción de newsletter
router.post("/unsubscribe", authMiddleware, unsubscribe);

// Obtener suscripciones del usuario
router.get("/subscriptions", authMiddleware, getSubscriptions);

module.exports = router;