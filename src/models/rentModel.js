const mongoose = require("mongoose");

// Define the schema for the team model
const RentSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  propertyNumber: {
    type: String,
    required: true,
  },
  BhadutName: {
    type: String,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },
  deposit: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  rentComplete: {
    type: Array,
    default: [],
  },
  rentStart: {
    type: String,
  },
  rentStatus: {
    type: Boolean,
    default: true
  },
  depositeDate: {
    type: String,
  },
});

// Create a model from the schema
const Rent = mongoose.model("Rent", RentSchema);

module.exports = Rent;
