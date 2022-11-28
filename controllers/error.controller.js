/**
 * Send 404 - Page not found -> unregistered routes
 */
exports.pageNotFound = (_req, res, _next) => {
  res.status(404).json({ message: 'Page not found' });
};

/**
 * Development Error Handler
 * Show detailed error message
 */
exports.developmentErrorsHandler = (error, _req, res, _next) => {
  console.log(error);
  res.status(error.status || 500).json({ error });
};

/**
 * Production Error Handler
 * Omit Error Details -> send plain text "Internal Server Error"
 */
exports.productionErrorHandler = (error, _req, res, _next) => {
  res.status(error.status || 500).json({
    error,
    message: 'Internal Server Error',
  });
};
