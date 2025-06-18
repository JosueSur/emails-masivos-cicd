const { DataTypes } = require('sequelize');

const Cliente = {
  init: (sequelize) => {
    return sequelize.define('Cliente', {
  id_clientes: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  organizacion_venta: {
    type: DataTypes.STRING
  },
  canal_distribucion: {
    type: DataTypes.STRING
  },
  sector: {
    type: DataTypes.STRING
  },
  matchcode: {
    type: DataTypes.STRING
  },
  poblacion: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING
  },
  clave_pais: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  grupo_clientes: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  tableName: 'clientes'
});
  }
};

module.exports = Cliente;
