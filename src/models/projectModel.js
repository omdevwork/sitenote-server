const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  imageUrl: String,
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  wings: {
    type: Array,    
  },
  teamId: String,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;