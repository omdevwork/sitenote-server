const Project = require("../models/projectModel");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notification_services");

let getProjectById = async (projectId) => {
  try {
    let project = await Project.findById(projectId);
    return project;
  } catch (err) {
    return err;
  }
};

let getProjectOfParticularTeam = async (teamId) => {
  try {
    let projects = await Project.find({
      teamId: teamId,
    }).exec();
    return projects;
  } catch (err) {
    return err;
  }
};

let createProject = async (projectObj) => {
  try {
    let createdProject = await projectObj.save();
    createdProject.projectId = await createdProject.id;
    let updatedProject = await createdProject.save();

    // Find all users with the teamId of the project
    let users = await User.find({ teamId: projectObj.teamId });
    // Remove the user who created this project
    users = users.filter((user) => user.userName !== projectObj.createdBy);
    // Iterate through users, check if they have fcmToken and send notification
    for (const user of users) {
      if (user.fcmToken && user.fcmToken !== "") {
        await sendNotification(user.fcmToken, `${projectObj.createdBy} create a Project ${projectObj.projectName}`, "New project created", "booking");
      }
    }

    return updatedProject;
  } catch (err) {
    return err;
  }
};

let updateProject = async (projectId, updateFields) => {
  try {
    return await Project.findByIdAndUpdate(projectId, updateFields, {
      new: true,
    });
  } catch (err) {
    return err;
  }
};

let deleteProject = async (projectId) => {
  try {
    const result = await Project.deleteOne({ _id: projectId }).exec();
    return result;
  } catch (err) {
    return err;
  } 
}

module.exports = {
  getProjectById,
  createProject,
  updateProject,
  getProjectOfParticularTeam,
  deleteProject
};
