const { roleService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const roleController = {
  async getAll(req, res) {
    try {
      const roles = await roleService.getAll();
      successResponse(res, roles, 'Roles obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.getById(id);
      if (!role) {
        return errorResponse(res, 'Rol no encontrado');
      }
      successResponse(res, role, 'Rol obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const role = await roleService.create(req.body);
      successResponse(res, role, 'Rol creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.update(id, req.body);
      successResponse(res, role, 'Rol actualizado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await roleService.delete(id);
      successResponse(res, null, 'Rol eliminado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getByName(req, res) {
    try {
      const { nombre } = req.params;
      const role = await roleService.getByName(nombre);
      if (!role) {
        return errorResponse(res, 'Rol no encontrado');
      }
      successResponse(res, role, 'Rol obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = roleController;
