const sequelize = require('../conexion/conexion.js');
const jwt = require("jsonwebtoken");
const key = "keyJWT"

module.exports = {
  crearUsuario: async (req, res) => {
    const { usuario, nombreyapellido, email, telefono, dirreciondeenvio, contraseña } = req.body;
    const admin = req.body.admin ? req.body.admin : 0;
    if (req.body.usuario && req.body.nombreyapellido && req.body.email && req.body.telefono && req.body.dirreciondeenvio && req.body.contraseña) {
      try {
        const usuarioExistente = await sequelize.query("SELECT email FROM usuario WHERE email=?", {
          replacements: [email],
          type: sequelize.QueryTypes.SELECT,
        });
        if (usuarioExistente.length == 0) {
          try {
            const data = await sequelize.query(
              "INSERT INTO usuario (usuario, nombreyapellido, email, telefono, dirreciondeenvio, contraseña, admin) VALUES (?,?,?,?,?,?,?)",
              {
                replacements: [usuario, nombreyapellido, email, telefono, dirreciondeenvio, contraseña, admin],
                type: sequelize.QueryTypes.INSERT,
              }
            );
            res.status(201).json({ "msj": "Usuario creado" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ "msj": "El email ya fue registrado" });
        }
      } catch (err) {
        console.log("error" + err);
      }
    } else {
      res.status(400).json({ "msj": "Todos los campos deben estar completos" });
    }
  },

  buscarUsuarios: async (req, res) => {
    try {
      const usuarios = await sequelize.query(
        "select * from USUARIO",
        { type: sequelize.QueryTypes.SELECT }
      );
      res.status(200).json(usuarios);
    } catch (err) {
      console.log("error" + err);
    }
  },

  logIn: async (req, res) => {
    const { email, contraseña } = req.body;
    if (req.body.email && req.body.contraseña) {
      try {
        const data = await sequelize.query("SELECT * from USUARIO where email=? AND contraseña=?", {
          replacements: [email, contraseña],
          type: sequelize.QueryTypes.SELECT,
        });
        if (data.length == 0) {
          res.status(401).json({ "msj": "Error en LogIn" });
        } else {
          const dataToken = {
            id: data[0].id,
            admin: data[0].admin
          };
          infoToken = jwt.sign(dataToken, key, { expiresIn: '1h' });
          if (data[0].admin == "true") {
            res.status(200).json({ "msj": "Aministrador logueado exitosamente", "token": infoToken });
          } else {
            res.status(200).json({ "msj": "Usuario logueado exitosamente", "token": infoToken });
          }
        }
      } catch (err) {
        console.log("error" + err);
      }
    } else {
      res.status(400).json({ "msj": "Todos los campos deben estar completos" });
    }
  }
}

