const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const { getRegistros, createRegistroNew, importPdf, guardarRegistro, deleteRegistro, /* getFechas, */ 
        getAllRegistrosById, cancelarRegistro, getNuevosClientes/* , actualizarClientes */ } = require("../controllers/registro/registroControllers")


const router = Router();

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "../files/"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
  });
    
  const uploadPdf = multer({
    storage,
  }).single("pdf");


module.exports = router;