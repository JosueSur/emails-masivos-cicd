const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login de usuario
router.post('/login', userController.login);

// Obtener roles
router.get('/roles', userController.getRoles);

// Crear usuario
router.post('/create', userController.createUser);

module.exports = router;
