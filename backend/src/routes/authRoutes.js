const express = require('express');
const router = express.Router();
const { authService } = require('../services/index');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, nombre } = req.body;
    
    if (!email || !password || !nombre) {
      return errorResponse(res, 'Todos los campos son requeridos');
    }

    const user = await authService.register({
      email,
      password,
      nombre
    });

    successResponse(res, user, 'Usuario registrado exitosamente');
  } catch (error) {
    errorResponse(res, error.message);
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return errorResponse(res, 'Usuario y contraseña son requeridos');
    }

    const result = await authService.login(usuario, password);
    successResponse(res, result, 'Login exitoso');
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message);
  }
});

// Validar token
router.get('/validate-token', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return errorResponse(res, 'Token no proporcionado', 401);
    }

    const result = await authService.validateToken(token);
    successResponse(res, result, 'Token válido');
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 401);
  }
});

module.exports = router;
