const sequelize = require('../conexion/conexion.js');

module.exports = {

    buscarInfoProductos: async (req, res, next) => {
        const producto = req.body.producto;
        try {
        const productob = await sequelize.query(
            "select * from PRODUCTOS where producto = ?",
            {
            replacements: [producto],
            type: sequelize.QueryTypes.SELECT
            }
        );
        req.infoproducto = productob;
        return next();
        } catch (err) {
        console.log("error" + err);
        }
    } 
}

