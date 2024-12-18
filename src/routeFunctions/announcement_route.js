const Announcement = require("../models/announcement");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notification_services");

const addAnnouncement = async (req, res) => {
  try {
    const { message, imageUrl, createdBy, createdAt, teamId } = req.body;
    if (!message || !imageUrl || !createdBy || !createdAt || !teamId) {
      return res.sendStatus(400);
    }

    const creatorUser = await User.findOne({ userName: createdBy });
    if (!creatorUser) {
      return res.status(404).json({ message: "Creator user not found" });
    }

    const otherUsers = await User.find({ teamId: teamId, userName: { $ne: createdBy } });
    const otherUsersWithFCMToken = otherUsers.filter((user) => user.fcmToken);

    // Send notifications to other users who have fcmToken
    otherUsersWithFCMToken.forEach(async (user) => {
      await sendNotification(user.fcmToken, "New Announcement", message, "/announcement");
    });

    await new Announcement(req.body).save();
    return res
      .status(200)
      .json({ message: "Successfully added announcement!" });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

const getAnnouncementByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    if (!teamId) {
      return res.sendStatus(400);
    }

    const announcement = await Announcement.find({ teamId });
    return res.json(announcement);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  addAnnouncement,
  getAnnouncementByTeamId,
};
