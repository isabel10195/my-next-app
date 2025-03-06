const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // 🔥 Acepta `Bearer token` o token en cookies

    if (!token) {
        req.user = { user_id: null };
        console.log("🔴 No hay token, usuario anónimo.");
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log("✅ Middleware pasado. Usuario autenticado:", req.user);
    } catch (err) {
        console.error("❌ Error al verificar token:", err);
        req.user = { user_id: null };
    }

    next();
};

module.exports = authMiddleware;
