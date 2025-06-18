const { Usuario, Role } = require('../models');

const usuarioService = {
  async getAll() {
    try {
      return await Usuario.findAll({
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  },

  async getById(id) {
    try {
      return await Usuario.findByPk(id, {
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  },

  async getByEmail(email) {
    try {
      return await Usuario.findOne({
        where: { email },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuario por email: ' + error.message);
    }
  },

  async getByUsername(username) {
    try {
      return await Usuario.findOne({
        where: { username },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuario por username: ' + error.message);
    }
  },

  async create(data) {
    try {
      return await Usuario.create(data);
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return await usuario.update(data);
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return await usuario.destroy();
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  },

  async incrementarConexiones(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      
      await usuario.increment('cantidad_conexiones');
      usuario.ultima_conexion = new Date();
      await usuario.save();
      
      return usuario;
    } catch (error) {
      throw new Error('Error al actualizar conexiones: ' + error.message);
    }
  },

  async obtenerUsuariosPorRol(roleId) {
    try {
      return await Usuario.findAll({
        where: { roleId },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuarios por rol: ' + error.message);
    }
  },

  async obtenerUsuariosActivos() {
    try {
      return await Usuario.findAll({
        where: {
          cantidad_conexiones: {
            [Op.gt]: 0
          }
        },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error al obtener usuarios activos: ' + error.message);
    }
  }
};

module.exports = usuarioService;
