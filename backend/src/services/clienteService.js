const { Cliente } = require('../models');

const clienteService = {
  async getAll() {
    try {
      return await Cliente.findAll();
    } catch (error) {
      throw new Error('Error al obtener clientes: ' + error.message);
    }
  },

  async getById(id) {
    try {
      return await Cliente.findByPk(id);
    } catch (error) {
      throw new Error('Error al obtener cliente: ' + error.message);
    }
  },

  async create(data) {
    try {
      return await Cliente.create(data);
    } catch (error) {
      throw new Error('Error al crear cliente: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
      return await cliente.update(data);
    } catch (error) {
      throw new Error('Error al actualizar cliente: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
      return await cliente.destroy();
    } catch (error) {
      throw new Error('Error al eliminar cliente: ' + error.message);
    }
  },

  async findByEmail(email) {
    try {
      return await Cliente.findOne({ where: { email } });
    } catch (error) {
      throw new Error('Error al buscar cliente por email: ' + error.message);
    }
  },

  async findByMatchcode(matchcode) {
    try {
      return await Cliente.findOne({ where: { matchcode } });
    } catch (error) {
      throw new Error('Error al buscar cliente por matchcode: ' + error.message);
    }
  }
};

module.exports = clienteService;
