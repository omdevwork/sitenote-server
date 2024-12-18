const express = require("express");
const router = express.Router();
const ActivityRoute = require("../routeFunctions/activity_route_function");

// Get announcement by teamId
router.get("/:teamId", ActivityRoute.getActivityByTeamId);

// Get announcement by teamId
router.put("/:id", ActivityRoute.updateActivity);

module.exports = router;