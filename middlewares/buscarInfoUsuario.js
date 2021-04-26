const sequelize = require('../conexion/conexion.js');

module.exports = {

    buscarInfoUsuario: async (req, res, next) => {
        const id = req.infoToken.id;
        try {
        const usuario = await sequelize.query(
            "select * from USUARIO where id = ?",
            {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
            }
        );
        req.infousuario = usuario;
        console.log(usuario)
        return next();
        } catch (err) {
        console.log("error" + err);
        }
    } 
}

