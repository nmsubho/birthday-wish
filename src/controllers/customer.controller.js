const httpStatus = require("http-status");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const ApiError = require("../errors/ApiError");
const Customer = require("../models/customer.model");

exports.createCustomer = catchAsync(async (req, res) => {
  const { name, email, birthdate } = req.body;

  const result = await Customer.create({
    name,
    email,
    birthdate,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    statusType: "success",
    message: "Customer added successfully",
    data: result,
  });
});

exports.getCustomerList = catchAsync(async (req, res) => {
  const result = await Customer.find();
  sendResponse(res, {
    status: httpStatus.OK,
    statusType: "success",
    message: "Customers fetched successfully",
    data: result,
  });
});

exports.getCustomerById = catchAsync(async (req, res) => {
  const result = await Customer.findById(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    statusType: "success",
    message: "Customer fetched successfully",
    data: result,
  });
});

exports.updateCustomerInformation = catchAsync(async (req, res) => {
  const { name, email, birthdate } = req.body;

  const result = await Customer.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, birthdate },
    {
      new: true,
      runValidators: true,
    }
  );

  sendResponse(res, {
    status: httpStatus.OK,
    statusType: "success",
    message: "Customer updated successfully",
    data: result,
  });
});

exports.deleteCustomer = catchAsync(async (req, res) => {
  const result = await Customer.findByIdAndDelete(req.params.id);

  if (!result) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      "Customer not found or deleted"
    );
  }

  sendResponse(res, {
    status: httpStatus.OK,
    statusType: "success",
    message: "Customer deleted successfully",
    data: null,
  });
});
