const { DataTypes } = require('sequelize');

const Estado = {
  init: (sequelize) => {
    return sequelize.define('Estado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(250)
  }
}, {
  timestamps: true,
  tableName: 'estados',
  schema: 'dbo'
});
  }
};

module.exports = Estado;
