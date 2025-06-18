const { estadoService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const estadoController = {
  async getAll(req, res) {
    try {
      const estados = await estadoService.getAll();
      successResponse(res, estados, 'Estados obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const estado = await estadoService.getById(id);
      if (!estado) {
        return errorResponse(res, 'Estado no encontrado');
      }
      successResponse(res, estado, 'Estado obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const estado = await estadoService.create(req.body);
      successResponse(res, estado, 'Estado creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const estado = await estadoService.update(id, req.body);
      successResponse(res, estado, 'Estado actualizado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await estadoService.delete(id);
      successResponse(res, null, 'Estado eliminado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = estadoController;
