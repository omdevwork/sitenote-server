const Activity = require("../models/activityModel");

const getActivityByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    if (!teamId) {
      return res.sendStatus(400);
    }

    const activity = await Activity.find({ teamId });
    return res.json(activity);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.sendStatus(400);
    }

    await Activity.findByIdAndUpdate(id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

module.exports = {
  getActivityByTeamId,
  updateActivity
};
