const { Usuario } = require('../models');
const { ldapService } = require('../services');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const userController = {
  async login(req, res) {
    try {
      const { usuario, password } = req.body;
      console.log('entra acaa');
      if (!usuario || !password) {
        return errorResponse(res, 'Faltan campos requeridos - usuario y contraseña');
      }

      // Verificar si el usuario existe
      const user = await Usuario.findOne({ where: { username: usuario } });
      if (!user) {
        return errorResponse(res, 'Usuario no encontrado');
      }

      // Verificar autenticación LDAP
      try {
        await ldapService.authDN(usuario, password);
        
        // Actualizar contador de conexiones
        await Usuario.update(
          {
            cantidad_conexiones: user.cantidad_conexiones + 1,
            ultima_conexion: new Date()
          },
          { where: { id: user.id } }
        );

        successResponse(res, user, 'Login exitoso');
      } catch (ldapError) {
        errorResponse(res, 'No se pudo autenticar con LDAP');
      }
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async getRoles(req, res) {
    try {
      const roles = await Usuario.findAll();
      successResponse(res, roles, 'Roles obtenidos exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  },

  async createUser(req, res) {
    try {
      const { nombre, apellido, email, username, roleId } = req.body;
      
      // Verificar si el usuario ya existe
      const existingUser = await Usuario.findOne({ where: { username } });
      if (existingUser) {
        return errorResponse(res, 'El usuario ya existe');
      }

      // Crear nuevo usuario
      const user = await Usuario.create({
        nombre,
        apellido,
        email,
        username,
        roleId
      });

      successResponse(res, user, 'Usuario creado exitosamente');
    } catch (error) {
      errorResponse(res, error.message);
    }
  }
};

module.exports = userController;
