const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
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
    tableName: 'roles',
    schema: 'dbo',
    timestamps: false,
    indexes: [     
      {
        name: "PK_roles",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};