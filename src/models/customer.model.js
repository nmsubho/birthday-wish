const mongoose = require("mongoose");
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Handle same email issue
customerSchema.pre("save", async function (next) {
  const isExist = await Customer.findOne({
    email: this.email,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Customer already exists with this email!"
    );
  }
  next();
});

customerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update && "email" in update) {
    const existingData = await this.model.findOne({ email: update.email });

    if (existingData) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Customer with the same email already exists."
      );
    }
  }

  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
