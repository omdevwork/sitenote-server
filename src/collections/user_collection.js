const Task = require("../models/tasksModel");
const User = require("../models/userModel");

let getUserById = async (userId) => {
  try {
    let user = await User.findOne({ userId });
    return user;
  } catch (err) {
    return err;
  }
};

let getAllUser = async () => {
  try {
    let users = await User.find({});
    // Extract email addresses from users array
    let emails = users.map((user) => user.email);
    return emails;
  } catch (err) {
    return err;
  }
};

let getUserByTeamId = async (teamId) => {
  try {
    let users = await User.find({ teamId: teamId }).exec();
    return users;
  } catch (err) {
    return err;
  }
};

let createUser = async (userObj) => {
  try {
    userObj.email === "venilsutariya7@gmail.com" ||
    userObj.email === "jenilthummar3108@gmail.com"
      ? (userObj.role = "admin")
      : (userObj.role = "sitemanager");
    let createdUser = await userObj.save();
    let updatedUser = await createdUser.save();
    return updatedUser;
  } catch (err) {
    return err;
  }
};

let updateUser = async (userId, updateFields) => {
  try {
    let user = await User.findById(userId);

    if (updateFields.userName && user) {
      const oldUserName = user.userName;
      const newUserName = updateFields.userName;

      // Find tasks where the userName matches oldUserName
      const tasks = await Task.find({ "chat.userName": oldUserName });

      // Iterate through tasks and update userName
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let chatUpdated = false;
        for (let j = 0; j < task.chat.length; j++) {
          if (task.chat[j].userName === oldUserName) {
            task.chat[j].userName = newUserName;
            chatUpdated = true;
          }
        }
        if (chatUpdated) {
          // Update the task in the database
          const id = task._id.toString();
          await Task.findByIdAndUpdate(id, task);
        }
      }
    }

    // Update userName for the user itself
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    return updatedUser;
  } catch (err) {
    return err;
  }
};

let updateUserByEmail = async (email, updateFields) => {
  try {
    // Find the user by email
    let user = await User.findOne({ email });

    // If user not found, return null or handle accordingly
    if (!user) {
      return null; // or throw new Error('User not found');
    }

    // Update user fields
    user.set(updateFields);

    // Save the updated user
    await user.save();

    return user;
  } catch (err) {
    return err;
  }
};

let removeUserById = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  getUserByTeamId,
  getAllUser,
  updateUserByEmail,
  removeUserById,
};
