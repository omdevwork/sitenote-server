const Task = require("../models/tasksModel");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notification_services");

let getTaskById = async (taskId) => {
  try {
    let task = await Task.findById(taskId);
    return task;
  } catch (err) {
    return err;
  }
};

let getTaskByTeamIdAndImageUrl = async (teamId) => {
  try {
    // Find tasks that match the teamId and have the imageUrl property
    let tasks = await Task.find({
      teamId: teamId,
      imageUrl: { $exists: true, $ne: null },
    });
    return tasks;
  } catch (err) {
    return err;
  }
};

let getTasksForDateOfParticularTeam = async (date, month, year, teamId) => {
  try {
    let tasks = await Task.find({
      teamId: teamId,
      createdDate: date,
      createdMonth: month,
      createdYear: year,
    }).exec();
    return tasks;
  } catch (err) {
    return err;
  }
};

let createTask = async (taskObj) => {
  try {
    if (taskObj.assignTo === "" || !taskObj.assignTo) {
      return null;
    }
    let createdTask = await taskObj.save();
    createdTask.taskId = await createdTask.id;
    let updatedTask = await createdTask.save();

    // Send task notification
    // Find the user based on the assignTo username
    const user = await User.findOne({ email: taskObj.assignTo });

    // If user is found, send notification
    if (user && user.fcmToken !== "") {
      await sendNotification(
        user.fcmToken,
        taskObj.taskTitle,
        "New task assigned",
        "taskteam"
      );
    }

    return updatedTask;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Function to send notifications for unseen tasks every 5 hours
const sendNotificationsForUnseenTasks = async () => {
  try {
    const tasks = await Task.find({ isSeen: false });
    for (const task of tasks) {
      const user = await User.findOne({ email: task.assignTo });
      if (user && user.fcmToken !== "") {
        await sendNotification(
          user.fcmToken,
          task.taskTitle,
          "New task assigned",
          "taskteam"
        );
      }
    }
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
};

// Schedule the function to run every 5 hours
setInterval(sendNotificationsForUnseenTasks, 5 * 60 * 60 * 1000); // 5 hours in milliseconds

let updateTask = async (taskId, updateFields) => {
  try {
    if (updateFields.isCompleted === true) {
      updateFields.completeTime = Date.now();
    }
    if (updateFields.chat) {
      const message = updateFields.chat[updateFields.chat.length - 1].message;
      const path = updateFields.chat[updateFields.chat.length - 1].path;
      let task = await Task.findById(taskId);
      if (
        task.assignTo ===
        updateFields.chat[updateFields.chat.length - 1].userName
      ) {
        let user = await User.findOne({ email: task.createdBy });
        if (user && user.fcmToken !== "") {
          await sendNotification(
            user.fcmToken,
            message,
            "New chat",
            `taskdetails/${taskId}/${path}`
          );
        }
      } else if (
        task.createdBy ===
        updateFields.chat[updateFields.chat.length - 1].userName
      ) {
        let user = await User.findOne({ email: task.assignTo });
        if (user && user.fcmToken !== "") {
          await sendNotification(
            user.fcmToken,
            message,
            "New chat",
            `taskdetails/${taskId}/${path}`
          );
        }
      }
    }

    return await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    });
  } catch (err) {
    return err;
  }
};

let getTaskByUserName = async (userName, teamId) => {
  try {
    // Query tasks based on userName and teamId
    const tasks = await Task.find({});
    const newtasks = tasks.filter(
      (task) => task.assignTo === userName && task.teamId === teamId
    );
    return newtasks;
  } catch (err) {
    return err;
  }
};

let deleteTaskById = async (id) => {
  try {
    await Task.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getTaskById,
  createTask,
  updateTask,
  getTasksForDateOfParticularTeam,
  getTaskByUserName,
  getTaskByTeamIdAndImageUrl,
  deleteTaskById,
};
