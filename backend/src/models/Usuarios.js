const { DataTypes } = require('sequelize');

const Usuario = {
  init: (sequelize) => {
    const model = sequelize.define('usuarios', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      apellido: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      cantidad_conexiones: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ultima_conexion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      }
    }, {
      sequelize,
      tableName: 'usuarios',
      schema: 'dbo'
    });

    return model;
  }
};

module.exports = Usuario;
