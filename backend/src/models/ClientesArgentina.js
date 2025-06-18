const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientesArgentina = sequelize.define('ClientesArgentina', {
  id_clientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  organizacion_venta: {
    type: DataTypes.INTEGER
  },
  canal_distribucion: {
    type: DataTypes.INTEGER
  },
  sector: {
    type: DataTypes.INTEGER
  },
  matchcode: {
    type: DataTypes.STRING(200)
  },
  poblacion: {
    type: DataTypes.STRING(200)
  },
  nombre: {
    type: DataTypes.STRING(200)
  },
  clave_pais: {
    type: DataTypes.STRING(200)
  },
  telefono: {
    type: DataTypes.STRING(200)
  },
  grupo_clientes: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(200)
  }
}, {
  timestamps: true,
  tableName: 'clientes_argentina',
  schema: 'dbo'
});

module.exports = ClientesArgentina;
