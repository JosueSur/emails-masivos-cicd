const { clienteService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const clienteController = {
  async getAll(req, res) {
    try {
      const clientes = await clienteService.getAll();
      successResponse(res, clientes, 'Clientes obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.getById(id);
      if (!cliente) {
        return errorResponse(res, 'Cliente no encontrado');
      }
      successResponse(res, cliente, 'Cliente obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const cliente = await clienteService.create(req.body);
      successResponse(res, cliente, 'Cliente creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.update(id, req.body);
      successResponse(res, cliente, 'Cliente actualizado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await clienteService.delete(id);
      successResponse(res, null, 'Cliente eliminado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async findByEmail(req, res) {
    try {
      const { email } = req.params;
      const cliente = await clienteService.findByEmail(email);
      if (!cliente) {
        return errorResponse(res, 'Cliente no encontrado');
      }
      successResponse(res, cliente, 'Cliente obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async findByMatchcode(req, res) {
    try {
      const { matchcode } = req.params;
      const cliente = await clienteService.findByMatchcode(matchcode);
      if (!cliente) {
        return errorResponse(res, 'Cliente no encontrado');
      }
      successResponse(res, cliente, 'Cliente obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = clienteController;
