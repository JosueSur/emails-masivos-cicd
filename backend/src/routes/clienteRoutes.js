const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas de clientes
router.get('/', clienteController.getAll);
router.get('/:id', clienteController.getById);
router.get('/email/:email', clienteController.findByEmail);
router.get('/matchcode/:matchcode', clienteController.findByMatchcode);
router.post('/', clienteController.create);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.delete);

module.exports = router;
