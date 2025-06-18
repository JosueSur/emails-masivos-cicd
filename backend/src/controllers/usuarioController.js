const { usuarioService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const usuarioController = {
  async getAll(req, res) {
    try {
      const usuarios = await usuarioService.getAll();
      successResponse(res, usuarios, 'Usuarios obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.getById(id);
      if (!usuario) {
        return errorResponse(res, 'Usuario no encontrado');
      }
      successResponse(res, usuario, 'Usuario obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getByEmail(req, res) {
    try {
      const { email } = req.params;
      const usuario = await usuarioService.getByEmail(email);
      if (!usuario) {
        return errorResponse(res, 'Usuario no encontrado');
      }
      successResponse(res, usuario, 'Usuario obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getByUsername(req, res) {
    try {
      const { username } = req.params;
      const usuario = await usuarioService.getByUsername(username);
      if (!usuario) {
        return errorResponse(res, 'Usuario no encontrado');
      }
      successResponse(res, usuario, 'Usuario obtenido exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const usuario = await usuarioService.create(req.body);
      successResponse(res, usuario, 'Usuario creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.update(id, req.body);
      successResponse(res, usuario, 'Usuario actualizado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await usuarioService.delete(id);
      successResponse(res, null, 'Usuario eliminado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async incrementarConexiones(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.incrementarConexiones(id);
      successResponse(res, usuario, 'Conexiones actualizadas exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async obtenerUsuariosPorRol(req, res) {
    try {
      const { roleId } = req.params;
      const usuarios = await usuarioService.obtenerUsuariosPorRol(roleId);
      successResponse(res, usuarios, 'Usuarios por rol obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async obtenerUsuariosActivos(req, res) {
    try {
      const usuarios = await usuarioService.obtenerUsuariosActivos();
      successResponse(res, usuarios, 'Usuarios activos obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = usuarioController;
