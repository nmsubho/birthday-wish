const express = require("express");
const cron = require("node-cron");
const app = express();

const cors = require("cors");
const httpStatus = require("http-status");
const globalErrorHandler = require("./src/middlewares/globalErrorHandler");
const routes = require("./src/routes");
const Customer = require("./src/models/customer.model");
const ApiError = require("./src/errors/ApiError");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

// Schedule email sending on birthdays
cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  try {
    const customers = await Customer.aggregate([
      {
        $addFields: {
          birthMonth: { $month: "$birthdate" },
          birthDate: { $dayOfMonth: "$birthdate" },
        },
      },
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$birthMonth", currentMonth] },
              { $eq: ["$birthDate", currentDate] },
            ],
          },
        },
      },
    ]);

    // customers.forEach(customer => {
    //   sendBirthdayEmail(customer.email, customer.name);
    // });
  } catch (error) {
    throw new ApiError(error);
  }
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      { path: req.originalUrl, message: "API is not available!" },
    ],
  });
  next();
});

module.exports = app;
