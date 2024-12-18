const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Number,
    default: 0,
  },
  isSeen: {
    type: Boolean,
    default: false,
    required: true,
  },
  seenTime: {
    type: Number,
  },
  completeTime: {
    type: Number,
  },
  createdBy: {
    type: String,
  },
  chat: {
    type: Array,
    default: [],
  },
  teamId: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
  assignTo:{
    type: String
  },
  imageUrl: {
    type: String
  },
  assigneeId: String,
  assignedToId: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: Number,
  createdDate: Number,
  createdMonth: Number,
  createdYear: Number,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;