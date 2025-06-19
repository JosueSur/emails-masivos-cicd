const { DataTypes, Sequelize } = require('sequelize');

const Registros = {
  init: (sequelize) => {
    const model = sequelize.define('registros', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      fecha_registro: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      fecha_programada: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      archivo: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      observacion: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      sociedades: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      }
    }, {
      sequelize,
      tableName: 'registros',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK_registros",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });

    return model;
  }
};

module.exports = Registros;
