const { Estado } = require('../models');

const estadoService = {
  async getAll() {
    try {
      return await Estado.findAll();
    } catch (error) {
      throw new Error('Error al obtener estados: ' + error.message);
    }
  },

  async getById(id) {
    try {
      return await Estado.findByPk(id);
    } catch (error) {
      throw new Error('Error al obtener estado: ' + error.message);
    }
  },

  async create(data) {
    try {
      return await Estado.create(data);
    } catch (error) {
      throw new Error('Error al crear estado: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const estado = await Estado.findByPk(id);
      if (!estado) {
        throw new Error('Estado no encontrado');
      }
      return await estado.update(data);
    } catch (error) {
      throw new Error('Error al actualizar estado: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const estado = await Estado.findByPk(id);
      if (!estado) {
        throw new Error('Estado no encontrado');
      }
      return await estado.destroy();
    } catch (error) {
      throw new Error('Error al eliminar estado: ' + error.message);
    }
  }
};

module.exports = estadoService;
