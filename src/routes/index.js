const express = require("express");
const CustomerRouter = require("./customer.routes");
const routes = express.Router();

routes.use("/customers", CustomerRouter);

module.exports = routes;
