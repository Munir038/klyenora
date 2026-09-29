export const errorHandler = (error, _request, response, _next) => {
  const statusCode = error.statusCode ?? 500;
  if (statusCode >= 500) console.error(error);
  response.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'Internal server error.' : error.message,
  });
};
