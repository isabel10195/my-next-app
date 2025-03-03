const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // 🔥 Acepta `Bearer token` o token en cookies

    if (!token) {
        req.user = { user_id: null }; // 🔹 Usuario anónimo (permite continuar sin bloquear)
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // 🔥 Usuario autenticado con datos decodificados
    } catch (err) {
        console.error("❌ Error al verificar token:", err);
        req.user = { user_id: null }; // 🔹 Si el token es inválido, tratamos al usuario como anónimo
    }

    next(); // 🔥 Permitir que la petición continúe sin importar si está autenticado o no
};

module.exports = authMiddleware;
