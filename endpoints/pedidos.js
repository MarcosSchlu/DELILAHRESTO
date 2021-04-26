const sequelize = require('../conexion/conexion.js');

module.exports = {
    crearPedido: async (req, res) => {
        const {producto, formadepago} = req.body;
        const usuario = req.infousuario[0].usuario;
        const precio = req.infoproducto[0].precio;
        const direcciondeenvio = req.infousuario[0].dirreciondeenvio;
        const estado = "Nuevo";
        if (req.body.producto && req.body.formadepago) {
            try {
                const data = await sequelize.query("INSERT INTO PEDIDO (usuario, producto, precio, direcciondeenvio, formadepago, estado) VALUES (?,?,?,?,?,?)", {
                    replacements: [usuario, producto, precio, direcciondeenvio, formadepago, estado],
                    type: sequelize.QueryTypes.INSERT,
                });
                res.status(201).json({ "msj": "Pedido creado" });
            } catch (err) {
                console.log("error" + err);
            }
        } else {
            res.status(400).json({ "msj": "Todos los campos deben estar completos" });
        }
    },

    buscarPedidos: async (req, res) => {
        try {
            const pedidos = await sequelize.query(
                "select * from PEDIDO",
                { type: sequelize.QueryTypes.SELECT }
            );
            res.status(200).json(pedidos);
        } catch (err) {
            console.log("error" + err);
        }
    },

    buscarPedidoPorUsuario: async (req, res) => {
        const usuario = req.infousuario[0].usuario;
        try {
            const pedido = await sequelize.query(
                "select * from PEDIDO where usuario = ?",
                {
                    replacements: [usuario],
                    type: sequelize.QueryTypes.SELECT
                }
            );
            res.status(200).json(pedido);
        } catch (err) {
            console.log("error" + err);
        }
    },

    actualizarpedido: async (req, res) => {
        const { id, estado } = req.body;
        const estados = ["Confirmado", "En preparacion", "Enviado", "Entregado", "Cancelado"];
        if (estados.includes(estado)) {
            try {
                const productoExistente = await sequelize.query("SELECT id FROM PEDIDO WHERE id=?", {
                    replacements: [id],
                    type: sequelize.QueryTypes.SELECT,
                });
                if (productoExistente.length != 0) {
                    if (estado) {
                        try {
                            const data = await sequelize.query("UPDATE PEDIDO SET estado=? WHERE id=?", {
                                replacements: [estado, id],
                                type: sequelize.QueryTypes.UPDATE,
                            });
                            res.status(200).json({ "msj": "Pedido modificado" });
                        } catch (err) {
                            console.log("error" + err);
                        }
                    } else {
                        res.status(400).json({ "msj": "Todos los campos deben estar completos" });
                    }
                } else {
                    res.status(400).json({ "msj": "Pedido inexistente" });
                }
            } catch (err) {
                console.log("error" + err);
            }
        } else {
            res.status(400).json({ "msj": "Estado de pedido inexistente" });
        }
    },
}