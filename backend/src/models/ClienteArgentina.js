const { DataTypes } = require('sequelize');

const ClienteArgentina = {
  init: (sequelize) => {
    return sequelize.define('ClienteArgentina', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING
  },
  grupo_clientes: {
    type: DataTypes.STRING
  },
  matchcode: {
    type: DataTypes.STRING
  },
  sector: {
    type: DataTypes.STRING
  },
  clave_pais: {
    type: DataTypes.STRING
  }
});
  }
};

module.exports = ClienteArgentina;
