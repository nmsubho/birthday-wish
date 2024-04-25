const express = require("express");
const cron = require("node-cron");
const app = express();

const cors = require("cors");
const httpStatus = require("http-status");
const globalErrorHandler = require("./src/middlewares/globalErrorHandler");
const routes = require("./src/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

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

// // Schedule email sending on birthdays
// cron.schedule("0 0 * * *", async () => {
//   const today = new Date();
//   const users = await customerCollection.find({}).toArray();
//   console.log(users);
//   // users.forEach(user => {
//   //   sendBirthdayEmail(user.email, user.name);
//   // });
// });

module.exports = app;
