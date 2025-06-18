const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

// Rutas de estados
router.get('/', estadoController.getAll);
router.get('/:id', estadoController.getById);
router.post('/', estadoController.create);
router.put('/:id', estadoController.update);
router.delete('/:id', estadoController.delete);

module.exports = router;
