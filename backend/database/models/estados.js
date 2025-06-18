const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estados', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
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
    tableName: 'estados',
    schema: 'dbo',
    timestamps: false,
    indexes: [     
      {
        name: "PK_estados",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};