const sequelize = require('../conexion/conexion.js');

module.exports = {
    crearPedido: async (req, res) => {
        const { pedido, formadepago, total } = req.body;
        const usuario = req.infousuario[0].usuario;
        const direcciondeenvio = req.infousuario[0].dirreciondeenvio;
        const estado = "Nuevo";
        const activa = "si";
        if (req.body.pedido && req.body.formadepago) {
            try {
                const ultimopedido = await sequelize.query("SELECT MAX(id) FROM `pedido`", {
                    type: sequelize.QueryTypes.SELECT,
                });
                const nuevopedido = (parseInt(Object.values(ultimopedido[0].valueOf("MAX(id)"))) + 1)
                pedido.forEach( (pedido) => {
                    sequelize.query("INSERT INTO ORDEN (idpedido,producto,cantidad) VALUES (?,?,?)", {
                        replacements: [nuevopedido, pedido.producto, pedido.cantidad],
                        type: sequelize.QueryTypes.INSERT,
                    });
                });
                const data = await sequelize.query("INSERT INTO PEDIDO (usuario, precio, direcciondeenvio, formadepago, estado, activa) VALUES (?,?,?,?,?,?)", {
                    replacements: [usuario, total, direcciondeenvio, formadepago, estado, activa],
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
            const activa = "si";
            const pedidos = await sequelize.query(
                "select * from PEDIDO where activa = ?",
                {
                    replacements: [activa],
                    type: sequelize.QueryTypes.SELECT
                }
            );
            res.status(200).json(pedidos);
        } catch (err) {
            console.log("error" + err);
        }
    },

    detalleDeLaOrden: async (req, res) => {
        try {
            const {pedido} = req.body;
            const orden = await sequelize.query(
                "select * from orden where idPedido = ?",
                {
                    replacements: [pedido],
                    type: sequelize.QueryTypes.SELECT
                }
            );
            res.status(200).json(orden);
        } catch (err) {
            console.log("error" + err);
        }
    },

    buscarPedidoPorUsuario: async (req, res) => {
        const usuario = req.infousuario[0].usuario;
        try {
            const activa = "si";
            const pedido = await sequelize.query(
                "select * from PEDIDO where usuario = ? and activa = ?",
                {
                    replacements: [usuario, activa],
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
                const pedidoExistente = await sequelize.query("SELECT id FROM PEDIDO WHERE id=?", {
                    replacements: [id],
                    type: sequelize.QueryTypes.SELECT,
                });
                if (pedidoExistente.length != 0) {
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

    eliminarPedido: async (req, res) => {
        const { id } = req.body;
        const pedidoEliminado = await sequelize.query("SELECT id FROM PEDIDO WHERE id=?", {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT,
        });
        if (pedidoEliminado.length != 0) {
            try {
                const desactivada = "no"
                const data = await sequelize.query("UPDATE PEDIDO SET activa=? WHERE id=?", {
                    replacements: [desactivada, id],
                    type: sequelize.QueryTypes.UPDATE,
                });
                res.status(200).json({ "msj": "Pedido eliminado" });
            } catch (err) {
                console.log("error" + err);
            }
        } else {
            res.status(400).json({ "msj": "Pedido inexistente" });
        }
    },

}