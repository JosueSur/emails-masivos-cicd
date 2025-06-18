const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientes', {
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
    email: {
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
    tableName: 'clientes',
    schema: 'dbo',
    timestamps: false,
    indexes: [     
      {
        name: "PK_clientes",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};