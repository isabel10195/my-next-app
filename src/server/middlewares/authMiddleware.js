const jwt = require("jsonwebtoken");
const SECRET_KEY = "lure";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("No autorizado");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Agregamos los datos del usuario al objeto `req`
        next();
    } catch (err) {
        console.error("Error al verificar token:", err);
        res.status(401).send("Token inválido");
    }
};

module.exports = authMiddleware;
