const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
  flatId: {
    type: String,
  },
  series: {
    type: String,
  },
  bhkSize: {
    type: String,
    required: true,
  },
  squareFeet: {
    type: Number,
  },
  isDeed: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: String,
  },
  teamId: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  notes: {
    type: Array,
    default: [],
  },
  paymentType: {
    type: String,
  },
  loanStatus: {
    type: String,
  },
  customerName: String,
  mobileNumber: String,
  alternateMobileNumber: String,
  brokerNumber: String,
  brokerName: String,
  address: String,
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: Number,
  isSold: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
  },
  updatedById: String,
});

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;