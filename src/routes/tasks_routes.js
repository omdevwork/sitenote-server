const express = require("express");
const router = express.Router();
const TaskRouteFunctions = require("../routeFunctions/tasks_route_function");

// Create a new task
router.post(
  "/",
  TaskRouteFunctions.createTask
);

// Get all tasks for a particular date and team
router.get(
  "/getTasksForDateOfParticularTeam",
  TaskRouteFunctions.getTasksForDateOfParticularTeam
);

// Get task by ID
router.get(
  "/:id",
  TaskRouteFunctions.getTaskById
);

// get task by UserName and teamId
router.get("/getTaskByUserName/:userName/:teamId", TaskRouteFunctions.getTaskByUserName);

router.get("/getTaskByTeamId/:teamId", TaskRouteFunctions.getTaskByTeamIdAndImageUrl);

// Update task by ID
router.put(
  "/:id",
  TaskRouteFunctions.updateTask
);

router.delete("/:id", TaskRouteFunctions.deleteTaskById);

module.exports = router;
