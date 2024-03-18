const errorHandler = (err, req, res, next) => {

  const errorCode = err?.response?.status || 500;
  res.status(errorCode).json({
    success: false,
    message: err?.message || "lol, take care, drink more water"
  });
};

const notFoundHandler = (req, res) => res.send('Not Found', 404) // json formatting is not required

module.exports = {
  errorHandler,
  notFoundHandler
}
