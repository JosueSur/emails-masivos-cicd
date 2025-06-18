const { Role } = require('../models');

const roleService = {
  async getAll() {
    try {
      return await Role.findAll();
    } catch (error) {
      throw new Error('Error al obtener roles: ' + error.message);
    }
  },

  async getById(id) {
    try {
      return await Role.findByPk(id);
    } catch (error) {
      throw new Error('Error al obtener rol: ' + error.message);
    }
  },

  async create(data) {
    try {
      return await Role.create(data);
    } catch (error) {
      throw new Error('Error al crear rol: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Rol no encontrado');
      }
      return await role.update(data);
    } catch (error) {
      throw new Error('Error al actualizar rol: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error('Rol no encontrado');
      }
      return await role.destroy();
    } catch (error) {
      throw new Error('Error al eliminar rol: ' + error.message);
    }
  },

  async getByName(nombre) {
    try {
      return await Role.findOne({ where: { nombre } });
    } catch (error) {
      throw new Error('Error al obtener rol por nombre: ' + error.message);
    }
  }
};

module.exports = roleService;
