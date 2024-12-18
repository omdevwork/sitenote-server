const express = require("express");
const router = express.Router();
const TeamRouteFunction = require("../routeFunctions/team_route_function");
// Create a new task
router.post("/", TeamRouteFunction.createTeam);

// Get task by ID
router.get("/:id", TeamRouteFunction.getTeam);

// Update task by ID
router.put("/:id", TeamRouteFunction.updateTeam);

module.exports = router;
