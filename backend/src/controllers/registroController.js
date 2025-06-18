const { registroService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const registroController = {
  async cargarClientes(req, res) {
    try {
      const file = req.file;
      if (!file) {
        return errorResponse(res, 'No se proporcionó un archivo');
      }

      const result = await registroService.cargarClientesDesdeExcel(file.path);
      successResponse(res, result, 'Clientes cargados exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async obtenerRegistros(req, res) {
    try {
      const registros = await registroService.obtenerRegistros();
      successResponse(res, registros, 'Registros obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = registroController;
