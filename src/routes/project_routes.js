const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const ProjectRouteFunctions = require("../routeFunctions/project_route_function");
// Create a new project
router.post("/", ProjectRouteFunctions.createProject);

// Get all projects
router.get(
  "/getProjectsByTeamId/:id",
  ProjectRouteFunctions.getProjectsByTeamId
);

// Get project by ID
router.get("/:id", ProjectRouteFunctions.getProjectById);

// Update project by ID
router.put("/:id", ProjectRouteFunctions.updateProject);

// Delete project by ID
router.delete("/:id", ProjectRouteFunctions.deleteProject);

module.exports = router;
