const { DataTypes } = require('sequelize');

const Role = {
  init: (sequelize) => {
    return sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  tableName: 'roles'
});
  }
};

module.exports = Role;
