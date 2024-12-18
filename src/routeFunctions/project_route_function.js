const Project = require("../models/projectModel");
const ProjectCollection = require("../collections/project_collection");
// Create a new project
const createProject = async (req, res) => {
  try {
    let project = new Project(req.body);
    project.createdAt = Date.now();
    const response = await ProjectCollection.createProject(project);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all projects
const getProjectsByTeamId = async (req, res) => {
  try {
    const teamId = req.params.id.toString();
    const projects = await ProjectCollection.getProjectOfParticularTeam(teamId);
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id.toString();
    const project = await ProjectCollection.getProjectById(projectId);
    res.send(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update project by ID
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id.toString();
    let projectObj = req.body.project;
    let updatedProject = await ProjectCollection.updateProject(
      projectId,
      projectObj
    );
    res.send(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await ProjectCollection.deleteProject(id);
    res.send({message: "project deleted successFully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createProject,
  getProjectById,
  getProjectsByTeamId,
  updateProject,
  deleteProject
};
