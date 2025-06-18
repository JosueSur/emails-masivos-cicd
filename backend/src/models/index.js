const { sequelize } = require('../config/database');

const Usuarios = require('./Usuarios');
const Cliente = require('./Cliente');
const ClienteArgentina = require('./ClienteArgentina');
const Estado = require('./Estado');
const Registro = require('./Registro');
const Role = require('./Role');

// Inicializar modelos
const usuario = Usuarios.init(sequelize);
const cliente = Cliente.init(sequelize);
const clienteArgentina = ClienteArgentina.init(sequelize);
const estado = Estado.init(sequelize);
const registro = Registro.init(sequelize);
const role = Role.init(sequelize);

// Establecer relaciones
usuario.belongsTo(role, { foreignKey: 'roleId' });
registro.belongsTo(usuario, { foreignKey: 'usuarioId' });

module.exports = {
  Usuarios: usuario,
  Cliente: cliente,
  ClienteArgentina: clienteArgentina,
  Estado: estado,
  Registro: registro,
  Role: role,
  sequelize
};
