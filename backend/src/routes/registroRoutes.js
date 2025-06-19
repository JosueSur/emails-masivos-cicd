const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const registroController = require('../controllers/registroController');

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../files/'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage
}).single('file');

// Rutas del registro
router.post('/cargar-clientes', upload, registroController.cargarClientes);
router.get('/obtener-registros', registroController.obtenerRegistros);
router.post('/crear-registro', registroController.crearRegistro);
router.put('/actualizar-registro/:id', registroController.actualizarRegistro);
router.delete('/eliminar-registro/:id', registroController.eliminarRegistro);

module.exports = router;