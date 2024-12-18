const mongoose = require("mongoose");

// Define the schema for the team model
const ActivitySchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  redirect: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  messageMain: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  }
});

// Create a model from the schema
const Activity  = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;