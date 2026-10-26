const { ValidationError: YupValidationError } = require('yup');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  if (
    err instanceof YupValidationError ||
    (err.name === 'ValidationError' && Array.isArray(err.inner))
  ) {
    const formattedErrors = err.inner.length
      ? err.inner.map((e) => ({
          field: e.path,
          message: e.message,
        }))
      : [{ field: err.path || 'unknown', message: err.message }];

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors =
      err.errors?.map((e) => ({
        field: e.path,
        message: `${e.path} already exists`,
      })) || [];

    return res.status(409).json({
      status: 'error',
      message: errors[0]?.message || 'Resource already exists',
      errors,
    });
  }

  if (err.name === 'SequelizeValidationError') {
    const errors =
      err.errors?.map((e) => ({
        field: e.path,
        message: e.message,
      })) || [];

    return res.status(400).json({
      status: 'error',
      message: 'Database validation error',
      errors,
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid data format or request parameters',
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid reference to a related resource',
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token has expired',
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Malformed JSON in request body',
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  return res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' &&
      statusCode === 500 && { stack: err.stack }),
  });
};
