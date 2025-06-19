const { DataTypes, Sequelize } = require('sequelize');

const Estados = {
  init: (sequelize) => {
    const model = sequelize.define('estados', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'estados',
      schema: 'dbo'
    });

    return model;
  }
};

module.exports = Estados;
