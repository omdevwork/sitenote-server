const mongoose = require("mongoose");

// Define the schema for the team model
const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  teamName: {
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
});

// Create a model from the schema
const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
