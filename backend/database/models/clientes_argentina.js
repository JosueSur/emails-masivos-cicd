const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientes_argentina', {
    id_clientes: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    organizacion_venta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    canal_distribucion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sector: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    matchcode: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    poblacion: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    clave_pais: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    grupo_clientes: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
    }, {
    sequelize,
    tableName: 'clientes_argentina',
    schema: 'dbo',
    timestamps: false,
    indexes: [     
      {
        name: "PK_clientes_argentina",
        unique: true,
        fields: [
          { name: 'id_clientes' },
        ]
      },
    ]
  });
};