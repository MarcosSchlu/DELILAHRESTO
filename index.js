const express = require("express");
const {crearPedido, buscarPedidos, buscarPedidoPorUsuario, actualizarpedido } = require('./endpoints/pedidos');
const {crearproducto, buscarProductos, actualizarproducto, eliminarProducto} = require('./endpoints/productos');
const {crearUsuario, buscarUsuarios, logIn} = require('./endpoints/usuarios');
const {validarJWT, validarJWTAdmin} = require('./middlewares/validarJWT');
const {buscarInfoUsuario} = require('./middlewares/buscarInfoUsuario');
const {buscarInfoProductos} = require('./middlewares/buscarInfoProductos');

const app = express();

app.use(express.json());

app.listen(3006, function () {
    console.log('Sistema armado en el puerto 3006')
})

//Pedidos
// Crea un nuevo pedido
app.post('/nuevopedido', validarJWT, buscarInfoUsuario, buscarInfoProductos,  crearPedido)

// Obtiene todos los pedidos
app.get('/pedidos', validarJWTAdmin, buscarPedidos)

// Obtiene pedidos de un usuario especifico
app.get('/pedido', validarJWT, buscarInfoUsuario, buscarPedidoPorUsuario)

// Modifica un pedido existente
app.post('/actualizarpedido', validarJWTAdmin, actualizarpedido)


//Productos
// Crea un nuevo producto
app.post('/nuevoproducto', validarJWTAdmin, crearproducto)

// Obtiene todos los productos
app.get('/productos',  validarJWT, buscarProductos)

// Modifica un producto existente
app.post('/actualizarproducto',  validarJWTAdmin, actualizarproducto)

// Elimina un producto
app.delete('/borrarproducto', validarJWTAdmin, eliminarProducto)


//Usuarios
// Crea un nuevo usuario
app.post('/nuevousuario', crearUsuario)

// Login
app.post("/login", logIn);

// Obtiene todos los usuarios
app.get('/usuarios', validarJWTAdmin, buscarUsuarios)

