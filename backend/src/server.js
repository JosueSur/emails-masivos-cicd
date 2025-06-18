const app = require('./index');
const { connect } = require('./config/database');

const PORT = process.env.PORT || 8001;

const startServer = async () => {
  try {
    await connect();
    await app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      console.log('SISTEMAS PRODEMAN SA');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
