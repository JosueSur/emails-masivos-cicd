const { ClientesArgentina } = require('../models');

const clientesArgentinaService = {
  async getAll() {
    try {
      return await ClientesArgentina.findAll();
    } catch (error) {
      throw new Error('Error al obtener clientes Argentina: ' + error.message);
    }
  },

  async getById(id) {
    try {
      return await ClientesArgentina.findByPk(id);
    } catch (error) {
      throw new Error('Error al obtener cliente Argentina: ' + error.message);
    }
  },

  async create(data) {
    try {
      return await ClientesArgentina.create(data);
    } catch (error) {
      throw new Error('Error al crear cliente Argentina: ' + error.message);
    }
  },

  async update(id, data) {
    try {
      const cliente = await ClientesArgentina.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente Argentina no encontrado');
      }
      return await cliente.update(data);
    } catch (error) {
      throw new Error('Error al actualizar cliente Argentina: ' + error.message);
    }
  },

  async delete(id) {
    try {
      const cliente = await ClientesArgentina.findByPk(id);
      if (!cliente) {
        throw new Error('Cliente Argentina no encontrado');
      }
      return await cliente.destroy();
    } catch (error) {
      throw new Error('Error al eliminar cliente Argentina: ' + error.message);
    }
  },

  async findByEmail(email) {
    try {
      return await ClientesArgentina.findOne({ where: { email } });
    } catch (error) {
      throw new Error('Error al buscar cliente Argentina por email: ' + error.message);
    }
  },

  async findByMatchcode(matchcode) {
    try {
      return await ClientesArgentina.findOne({ where: { matchcode } });
    } catch (error) {
      throw new Error('Error al buscar cliente Argentina por matchcode: ' + error.message);
    }
  },

  async findBySector(sector) {
    try {
      return await ClientesArgentina.findAll({ where: { sector } });
    } catch (error) {
      throw new Error('Error al buscar clientes Argentina por sector: ' + error.message);
    }
  }
};

module.exports = clientesArgentinaService;
