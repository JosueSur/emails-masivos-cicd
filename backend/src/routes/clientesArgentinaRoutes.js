const express = require('express');
const router = express.Router();
const clientesArgentinaController = require('../controllers/clientesArgentinaController');

// Rutas de clientes Argentina
router.get('/', clientesArgentinaController.getAll);
router.get('/:id', clientesArgentinaController.getById);
router.get('/email/:email', clientesArgentinaController.findByEmail);
router.get('/matchcode/:matchcode', clientesArgentinaController.findByMatchcode);
router.get('/sector/:sector', clientesArgentinaController.findBySector);
router.post('/', clientesArgentinaController.create);
router.put('/:id', clientesArgentinaController.update);
router.delete('/:id', clientesArgentinaController.delete);

module.exports = router;
