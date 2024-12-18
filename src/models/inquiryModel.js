const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
    },
    teamId: {
      type: String,
      required: true,
    },
    brokerNumber: {
      type: String,
    },
    createdAt: {
      type: String,
      required: true,
    },
  });

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
