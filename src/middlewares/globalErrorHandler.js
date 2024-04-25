const httpStatus = require("http-status");
const handleValidationError = require("../errors/handleValidationError");
const handleCastError = require("../errors/handleCastError");
const ApiError = require("../errors/ApiError");
const config = require("../config");

const globalErrorHandler = (error, req, res, next) => {
  config.env !== "production" &&
    console.log("Global Error Handler ::: ", error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error.message
      ? [{ path: "", message: error?.message }]
      : [];
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    const errorMessage = `${
      error.keyValue[Object.keys(error.keyValue)[0]]
    } is already registered in database!`;
    statusCode = httpStatus.CONFLICT;
    message = errorMessage;
    errorMessages = errorMessage ? [{ path: "", message: errorMessage }] : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: "", message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined,
  });
};

module.exports = globalErrorHandler;
