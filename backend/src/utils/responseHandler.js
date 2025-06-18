const successResponse = (res, data, message = 'Operación exitosa', status = 200) => {
  res.status(status).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message, status = 400, error = null) => {
  res.status(status).json({
    success: false,
    message,
    error
  });
};

const validateRequest = (req, res, next) => {
  const { body } = req;
  
  if (!body) {
    return errorResponse(res, 'Datos de solicitud inválidos');
  }

  next();
};

module.exports = {
  successResponse,
  errorResponse,
  validateRequest
};
