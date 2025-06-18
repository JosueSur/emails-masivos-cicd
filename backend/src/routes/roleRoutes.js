const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Rutas de roles
router.get('/', roleController.getAll);
router.get('/:id', roleController.getById);
router.get('/nombre/:nombre', roleController.getByName);
router.post('/', roleController.create);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;
