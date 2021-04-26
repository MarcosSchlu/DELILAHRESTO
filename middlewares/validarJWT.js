const jwt = require ("jsonwebtoken")
const key = "keyJWT"

module.exports = {
    validarJWT: (req, res, next) => {
        try {
        const token = req.headers.authorization;
        const verificarToken = jwt.verify(token, key);
        if (verificarToken) {
            req.infoToken = verificarToken;
            return next();
        }
        } catch (error) {
        res.status(401).json({"msj":"Usuario no valido"});
        }
    },
    validarJWTAdmin: (req, res, next) => {
        try {
        const token = req.headers.authorization;
        const verificarToken = jwt.verify(token, key);
        if (verificarToken) {
            req.infoToken = verificarToken;
            if (req.infoToken.admin == "true") {
                return next();
            } else {
                res.status(401).json({"msj":"El usuario no tiene rol de administrador"});
            }
        }
        } catch (error) {
        res.status(401).json({"msj":"Usuario no valido"});
        }
    },
    };