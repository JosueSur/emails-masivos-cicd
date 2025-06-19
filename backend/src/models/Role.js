const { DataTypes } = require('sequelize');

const Role = {
  init: (sequelize) => {
    const model = sequelize.define('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'roles',
      schema: 'dbo'
    });

    return model;
  }
};

module.exports = Role;
