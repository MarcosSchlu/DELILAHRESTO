const Sequelize = require('sequelize');
const path = 'mysql://root@localhost:3306/delilahresto';
const sequelize = new Sequelize( path,{
    host: 'localhost',
    port: '3006',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
},);

sequelize.authenticate().then(() => {
    console.log('Base de datos conectada.');
}).catch(err => {
    console.error('Error de conexion:', err);
})

module.exports = sequelize;