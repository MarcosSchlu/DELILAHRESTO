# PROYECTO 3 ACAMICA - DELILAH RESTO

El objetivo del trabajo es generar el backend para un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

## Instalación e inicializacion del proyecto

1. Clonar proyecto

Clonar el repositorio desde el [siguiente link](https://github.com/MarcosSchlu/DELILAHRESTO.git).

2. Instalación de dependencias

Las dependencias utilizadas en el proyecto fueron:
- Node.js
- Nodemon
- Express
- JWT
- MySQL
- Sequelize

Para instalar las dependencias deberas ingresar por terminal 
```
npm install
```

3. Iniciando el servidor
Para inicializar la base de datos es necesario correr el servidor. En mi caso utilice Xampp (Apache y PhpMyAdmin)

4. Creando base de datos
Copiar las queries del archivo llamado queries.sql, y correrlas en consola SQL. Esto crea todas las tablas y añade algunos registros.

5. Inicializar el proyecto
Para ello deberas ingresar por terminal 
```
npm start
```

## Endpoints

### USUARIOS

|  METODO | ENDPOINT           | BODY                                                                             | HEADER | DESCRIPCION                      |
|---------|--------------------|----------------------------------------------------------------------------------|--------|----------------------------------|
| POST    | /nuevousuario      |{ usuario, nombreyapellido, email, telefono, email, dirreciondeenvio, contraseña }|        | Crea nuevo usuario               |
| POST    | /usuarios/login    |{ email, contraseña }                                                             |        | Login de usuario                 |
| GET     | /usuarios          |                                                                                  |{token} | Usuarios registrados             |

### PRODUCTOS

|  METHOD | ENDPOINT           | BODY                                                                             | HEADER | DESCRIPCION                      |
|---------|--------------------|----------------------------------------------------------------------------------|--------|----------------------------------|
| POST    | /nuevoproducto     | { producto, precio }                                                             |{token} | Crea nuevo producto              |
| GET     | /productos         |                                                                                  |{token} | Productos registrados            |
| PUT     | /actualizarproducto| { producto, precio }                                                             |{token} | Modifica un producto             |
| DELETE  | /borrarproducto    | { id }                                                                           |{token} | Eliminar un producto             |

### PEDIDOS

|  METHOD | ENDPOINT           | BODY                                                                             | HEADER | DESCRIPCION                      |
|---------|--------------------|----------------------------------------------------------------------------------|--------|----------------------------------|
| POST    | /nuevopedido       | {producto, formadepago}                                                          |{token} | Crea nuevo pedido                |
| GET     | /pedidos           |                                                                                  |{token} | Pedidos registrados              |
| GET     | /pedido            |                                                                                  |{token} | Pedidos registrados por usuario  |
| POST    | /actualizarpedido  | { id, estado }                                                                   |{token} | Modifica el estado de un pedido  |

El token es unico a cada usuario que se loguea y expira a la hora. 
