const { sequelize, connect } = require('../config/database');

// Primero establecer la conexión y asegurarse de que se establece correctamente
try {
  connect();
  console.log('Conexión a la base de datos establecida');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
  throw error;
}

// Verificar que la conexión está activa
if (!sequelize) {
  throw new Error('No se pudo establecer la conexión a la base de datos');
}

const Usuarios = require('./Usuarios');
const Cliente = require('./Cliente');
const ClienteArgentina = require('./ClienteArgentina');
const Estados = require('./Estados');
const Registros = require('./Registros');
const Role = require('./Role');

// Inicializar modelos
const modelos = {
  Usuarios: null,
  Cliente: null,
  ClienteArgentina: null,
  Estados: null,
  Registros: null,
  Role: null,
  sequelize
};

try {
  modelos.Usuarios = Usuarios.init(sequelize);
  modelos.Cliente = Cliente.init(sequelize);
  modelos.ClienteArgentina = ClienteArgentina.init(sequelize);
  modelos.Estados = Estados.init(sequelize);
  modelos.Registros = Registros.init(sequelize);
  modelos.Role = Role.init(sequelize);

  // Verificar que todos los modelos se inicializaron correctamente
  if (!modelos.Usuarios || !modelos.Registros || !modelos.Estados || !modelos.Role) {
    throw new Error('Algunos modelos no se inicializaron correctamente');
  }

  // Establecer relaciones
  modelos.Usuarios.belongsTo(modelos.Role, { foreignKey: 'roleId' });
  modelos.Registros.belongsTo(modelos.Usuarios, { foreignKey: 'usuarioId' });
  modelos.Registros.belongsTo(modelos.Estados, { foreignKey: 'estadoId' });
  modelos.Estados.hasMany(modelos.Registros, { foreignKey: 'estadoId' });

} catch (error) {
  console.error('Error al inicializar los modelos:', error);
  throw error;
}

module.exports = modelos;
