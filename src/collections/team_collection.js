const Team = require("../models/teamModel");

let getTeamById = async (teamId) => {
  try {
    let team = await Team.findOne({ teamId });
    return team;
  } catch (err) {
    return err;
  }
};

let createTeam = async (teamObj) => {
  try {
    let createdTeam = await teamObj.save();
    let updatedTeam = await createdTeam.save();
    return updatedTeam;
  } catch (err) {
    return err;
  }
};

let updateTeam = async (teamId, updateFields) => {
  try {
    return await Team.findByIdAndUpdate(teamId, updateFields, {
      new: true,
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getTeamById,
  createTeam,
  updateTeam,
};