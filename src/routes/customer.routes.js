const express = require("express");
const customerController = require("../controllers/customer.controller");

const CustomerRouter = express.Router();

CustomerRouter.get("/", customerController.getCustomerList);
CustomerRouter.get("/:id", customerController.getCustomerById);
CustomerRouter.post("/", customerController.createCustomer);
CustomerRouter.put("/:id", customerController.updateCustomerInformation);
CustomerRouter.delete("/:id", customerController.deleteCustomer);

module.exports = CustomerRouter;
