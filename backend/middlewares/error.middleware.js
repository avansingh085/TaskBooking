const httpStatus = require("../utils/httpStatus.js");

const globalErrorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = globalErrorHandler;