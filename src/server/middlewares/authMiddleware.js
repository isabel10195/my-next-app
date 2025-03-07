const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    console.log("📡 Middleware de autenticación activado.");

    // 🔹 Verificar si hay cookies en la petición
    if (!req.cookies) {
        console.error("⚠️ No hay cookies en la petición en authMiddleware.");
        req.user = { user_id: null };
        return next();
    }

    console.log("🍪 Cookies recibidas en la petición:", req.cookies);

    // 🔹 Obtener el token de las cookies o del header Authorization
    let token = req.cookies.token || (req.headers.authorization?.split(" ")[1] ?? null);
    
    console.log("🔑 Token encontrado en authMiddleware:", token);

    if (!token) {
        console.log("🔴 No hay token, usuario anónimo en authMiddleware.");
        req.user = { user_id: null };
        return next();
    }

    try {
        // 🔹 Decodificar token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log("✅ Usuario autenticado en authMiddleware:", req.user);
    } catch (err) {
        console.error("❌ Error al verificar token en authMiddleware:", err);
        req.user = { user_id: null };
    }

    next();
};

module.exports = authMiddleware;
