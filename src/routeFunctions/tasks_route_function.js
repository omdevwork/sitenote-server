const Task = require("../models/tasksModel");
const TaskCollection = require("../collections/task_collection");
const DateFormatter = require("../utils/date_formatting");
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    if(!task.assignTo || task.assignTo === "") {
      return res.sendStaus(400);
    }
    if(!task.createdAt) {
      task.createdAt = Date.now();
    }
    let currentTime = new Date();
    task.createdDate = DateFormatter.getCurrentDate(currentTime);
    task.createdMonth = DateFormatter.getCurrentMonth(currentTime);
    task.createdYear = DateFormatter.getCurrentYear(currentTime);
    const response = await TaskCollection.createTask(task);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasksForDateOfParticularTeam = async (req, res) => {
  try {
    const task = new Task(req.body.task);
    const response = await TaskCollection.getTasksForDateOfParticularTeam(
      task.createdDate,
      task.createdMonth,
      task.createdYear,
      task.teamId
    );
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id.toString();
    const response = await TaskCollection.getTaskById(taskId);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskByTeamIdAndImageUrl = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const response = await TaskCollection.getTaskByTeamIdAndImageUrl(teamId);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id.toString();
    let taskObj = req.body.task;
    let updatedTask = await TaskCollection.updateTask(taskId, taskObj);
    res.send(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskByUserName = async(req, res) => {
  try {
    const { userName, teamId } = req.params;
    let tasks = await TaskCollection.getTaskByUserName(userName, teamId);
    res.send(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    await TaskCollection.deleteTaskById(id);

    res.send({message: "task deleted successFully"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getTaskById,
  getTasksForDateOfParticularTeam,
  updateTask,
  getTaskByUserName,
  getTaskByTeamIdAndImageUrl,
  deleteTaskById,
};
