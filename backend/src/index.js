require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Configuración de Express
const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Configuración de CORS específica
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.EMAILS_MASIVOS);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/registro', require('./routes/registroRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/estados', require('./routes/estadoRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/clientes-argentina', require('./routes/clientesArgentinaRoutes'));

// Servir archivos estáticos
app.use(express.static(path.resolve(__dirname + '/../public')));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Algo salió mal',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
