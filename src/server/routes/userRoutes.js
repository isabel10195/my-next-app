const express = require("express");
const {
  getUserData,
  getUserDetails,
  updateUserDetail,
  deleteUserDetail,
  getUserByHandle,          
  getUserDetailsByHandle,
  getUserActivity   
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas relacionadas con usuarios
router.get("/data", authMiddleware, getUserData);
router.get("/details", authMiddleware, getUserDetails);
router.post("/details", authMiddleware, updateUserDetail);    // Añadir interés, habilidad, etc.
router.delete("/details", authMiddleware, deleteUserDetail);  // Eliminar detalle
router.get("/handle/:handle", getUserByHandle); // sin authMiddleware, es público
router.get("/handle/:handle/details", getUserDetailsByHandle); // también sin authMiddleware
router.get("/activity", authMiddleware, getUserActivity);


module.exports = router;
