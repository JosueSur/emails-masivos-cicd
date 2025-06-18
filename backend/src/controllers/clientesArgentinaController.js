const { clientesArgentinaService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const clientesArgentinaController = {
  async getAll(req, res) {
    try {
      const clientes = await clientesArgentinaService.getAll();
      successResponse(res, clientes, 'Clientes Argentina obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clientesArgentinaService.getById(id);
      if (!cliente) {
        return errorResponse(res, 'Cliente Argentina no encontrado');
      }
      successResponse(res, cliente, 'Cliente Argentina obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const cliente = await clientesArgentinaService.create(req.body);
      successResponse(res, cliente, 'Cliente Argentina creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clientesArgentinaService.update(id, req.body);
      successResponse(res, cliente, 'Cliente Argentina actualizado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await clientesArgentinaService.delete(id);
      successResponse(res, null, 'Cliente Argentina eliminado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async findByEmail(req, res) {
    try {
      const { email } = req.params;
      const cliente = await clientesArgentinaService.findByEmail(email);
      if (!cliente) {
        return errorResponse(res, 'Cliente Argentina no encontrado');
      }
      successResponse(res, cliente, 'Cliente Argentina obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async findByMatchcode(req, res) {
    try {
      const { matchcode } = req.params;
      const cliente = await clientesArgentinaService.findByMatchcode(matchcode);
      if (!cliente) {
        return errorResponse(res, 'Cliente Argentina no encontrado');
      }
      successResponse(res, cliente, 'Cliente Argentina obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async findBySector(req, res) {
    try {
      const { sector } = req.params;
      const clientes = await clientesArgentinaService.findBySector(sector);
      successResponse(res, clientes, 'Clientes Argentina por sector obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = clientesArgentinaController;
