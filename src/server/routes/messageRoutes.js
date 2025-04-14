const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  searchUser,
  addContact,
  getContacts,
  getConversation,
  sendMessage,
  getFollowedUsers,
  getUnreadCount,
  markAsRead,
  getUnreadMessages
} = require("../controllers/messageController");

const router = express.Router();

// Buscador de usuario: ?query=
router.get("/search", authMiddleware, searchUser);

// Agregar contacto
router.post("/contacts", authMiddleware, addContact);

// Obtener contactos / chats recientes
router.get("/contacts", authMiddleware, getContacts);

// Obtener conversación con un contacto
router.get("/conversation/:contactId", authMiddleware, getConversation);

// Enviar mensaje
router.post("/", authMiddleware, sendMessage);

router.get("/followed-users", authMiddleware, getFollowedUsers);

router.get("/unread", authMiddleware, getUnreadCount);

router.get("/unread-messages", authMiddleware, getUnreadMessages);

router.put("/conversation/:contactId/read", authMiddleware, markAsRead);

module.exports = router;