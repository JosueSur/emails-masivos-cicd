const { DataTypes } = require('sequelize');

const Usuario = {
  init: (sequelize) => {
    return sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad_conexiones: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ultima_conexion: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,
  tableName: 'usuarios'
});
  }
};

module.exports = Usuario;
