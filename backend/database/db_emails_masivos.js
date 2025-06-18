'use strict';

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');



// conexión a MSSQL 
//const sequelize = new Sequelize(process.env.SQL_SEQUELIZE);
const sequelize = new Sequelize(process.env.SQL_SEQUELIZE, {logging:false});
/* const sequelize_view = new Sequelize(process.env.SQL_SEQUELIZE_VIEW, {logging:false}); */

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename && file!==undefined) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
    modelDefiners.forEach(model => model(sequelize, DataTypes));

// Capitalizamos los nombres de los modelos ie: product => Product

    let entries = Object.entries(sequelize.models);
    let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
    sequelize.models = Object.fromEntries(capsEntries);


    // En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Clientes, Estados, Registros, Roles, Usuarios, Clientes_argentina } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews) -- belongsToMany

Roles.hasOne(Usuarios);
Usuarios.belongsTo(Roles);

Usuarios.hasOne(Registros);
Registros.belongsTo(Usuarios);

Estados.hasOne(Registros);
Registros.belongsTo(Estados);

Registros.belongsToMany(Clientes, { through: "RegistroXcliente" });
Clientes.belongsToMany(Registros, { through: "RegistroXcliente" });



module.exports = {
    ...sequelize.models,
    conexion_emails_masivos: sequelize,
    /* conexion_clientes_view: sequelize_view, */
};