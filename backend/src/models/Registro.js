const { DataTypes } = require('sequelize');

const Registro = {
  init: (sequelize) => {
    return sequelize.define('Registro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente'
  }
}, {
  timestamps: true,
  tableName: 'registros'
});

// Relación con Usuario
Registro.belongsTo(Usuario, { foreignKey: 'usuarioId' });
  }
};

module.exports = Registro;
