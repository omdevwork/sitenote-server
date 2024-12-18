const express = require("express");
const router = express.Router();
const AnnouncementRoute = require("../routeFunctions/announcement_route");

// Create a Announcement
router.post("/", AnnouncementRoute.addAnnouncement);

// Get announcement by teamId
router.get("/:teamId", AnnouncementRoute.getAnnouncementByTeamId);

module.exports = router;
