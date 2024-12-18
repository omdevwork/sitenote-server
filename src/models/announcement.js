const mongoose = require("mongoose");

// Define the schema for the team model
const AnnouncementSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});

// Create a model from the schema
const Announcement  = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;