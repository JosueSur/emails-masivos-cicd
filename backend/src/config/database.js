const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('mssql://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME, {
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  connect
};
