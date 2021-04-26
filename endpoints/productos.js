const sequelize = require('../conexion/conexion.js')

module.exports = {
    crearproducto: async (req, res) => {
        const { producto, precio } = req.body
        if (req.body.producto && req.body.precio) {
            try {
                const productExistente = await sequelize.query("SELECT producto FROM PRODUCTOS WHERE producto=?", {
                    replacements: [producto],
                    type: sequelize.QueryTypes.SELECT,
                });
                if (productExistente == 0) {
                    try {
                        const data = await sequelize.query("INSERT INTO PRODUCTOS (producto, precio) VALUES (?,?)", {
                            replacements: [producto, precio],
                            type: sequelize.QueryTypes.INSERT,
                        });
                        res.status(201).json({ "msj": "Producto creado" });
                    } catch (err) {
                        console.log("error" + err);
                    }
                } else {
                    res.status(400).json({ "msj": "El producto ya existe" });
                }
            } catch (err) {
                console.log("error" + err);
            }
        } else {
            res.status(400).json({ "msj": "Todos los campos deben estar completos" });
        }
    },

    buscarProductos: async (req, res) => {
        try {
            const productos = await sequelize.query(
                "select * from PRODUCTOS",
                { type: sequelize.QueryTypes.SELECT }
            );
            res.status(200).json(productos);
        } catch (err) {
            console.log("error" + err);
        }
    },

    actualizarproducto: async (req, res) => {
        const { producto, precio } = req.body;
        try {
            const productoExistente = await sequelize.query("SELECT producto FROM PRODUCTOS WHERE producto=?", {
                replacements: [producto],
                type: sequelize.QueryTypes.SELECT,
            });
            if (productoExistente.length != 0) {
                if (precio) {
                    try {
                        const data = await sequelize.query("UPDATE PRODUCTOS SET precio=? WHERE producto=?", {
                            replacements: [precio, producto],
                            type: sequelize.QueryTypes.UPDATE,
                        });
                        res.status(200).json({ "msj": "Producto modificado" });
                    } catch (err) {
                        console.log("error" + err);
                    }
                } else {
                    res.status(400).json({ "msj": "Todos los campos deben estar completos" });
                }
            } else {
                res.status(400).json({ "msj": "Producto inexistente" });
            }
        } catch (err) {
            console.log("error" + err);
        }
    },


    eliminarProducto: async (req, res) => {
        const { id } = req.body.id;
        try {
            const producto = await sequelize.query(
                "delete from PRODUCTOS where id = ?",
                {
                    replacements: [id],
                    type: sequelize.QueryTypes
                }
            );
            res.status(201).json({ "msj": "Producto eliminado" });
        } catch (err) {
            console.log("error" + err);
        }
    },
}