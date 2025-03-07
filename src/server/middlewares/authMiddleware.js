const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    if (!req.cookies) {
        console.error("⚠️ No hay cookies en la petición en authMiddleware");
        req.user = { user_id: null };
        return next();
    }

    let token = req.cookies.token || (req.headers.authorization?.split(" ")[1] ?? null);

    if (!token) {
        console.log("🔴 No hay token, usuario anónimoen authMiddleware.");
        req.user = { user_id: null };
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log("✅ Middleware pasado. Usuario autenticado en authMiddleware:", req.user);
    } catch (err) {
        console.error("❌ Error al verificar token:en authMiddleware", err);
        req.user = { user_id: null };
    }

    next();
};

module.exports = authMiddleware;
