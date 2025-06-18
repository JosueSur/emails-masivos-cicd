const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de usuarios
router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.get('/email/:email', usuarioController.getByEmail);
router.get('/username/:username', usuarioController.getByUsername);
router.get('/rol/:roleId', usuarioController.obtenerUsuariosPorRol);
router.get('/activos', usuarioController.obtenerUsuariosActivos);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
router.post('/:id/conexiones', usuarioController.incrementarConexiones);

module.exports = router;
