const Team = require("../models/teamModel");
const TeamCollection = require("../collections/team_collection");
// Create a new team
const createTeam = async (req, res) => {
  try {
    let team = new Team(req.body);
    team.createdAt = Date.now();
    const response = await TeamCollection.createTeam(team);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get team by ID
const getTeam = async (req, res) => {
  try {
    const teamId = req.params.id.toString();
    const team = await TeamCollection.getTeamById(teamId);
    res.json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update team by ID
const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id.toString();
    let teamObj = req.body.team;
    let updatedTeam = await FlatCollection.updateFlat(teamId, teamObj);
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTeam,
  getTeam,
  updateTeam,
};
