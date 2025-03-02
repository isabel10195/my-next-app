const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // 🔥 Acepta `Bearer token`

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Agregamos los datos del usuario al objeto `req`
        next();
    } catch (err) {
        console.error("❌ Error al verificar token:", err);
        res.status(401).send("Token inválido");
    }
};

module.exports = authMiddleware;
