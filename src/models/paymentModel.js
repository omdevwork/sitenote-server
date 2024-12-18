const mongoose = require("mongoose");

// Define the schema for the team model
const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Number,
    required: true,
  },
  flatId: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

// Create a model from the schema
const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;