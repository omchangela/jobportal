const AppError = require('../utils/appError');

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming errors
  console.error('ERROR 💥', err);

  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

  if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
    let error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err)
    );

    if (err.code === 11000) {
      error = new AppError('Duplicate field value. Please use another value!', 400);
    }

    if (error.name === 'ValidationError') {
      // Collect all validation error messages
      const message = Object.values(error.errors)
        .map(err => err.message)
        .join('. ');
      error = new AppError(message, 400);
    }

    if (error.name === 'CastError') {
      error = new AppError(`Invalid ${error.path}: ${error.value}.`, 400);
    }

    return sendProdError(error, res);
  }

  sendDevError(err, res);
};
