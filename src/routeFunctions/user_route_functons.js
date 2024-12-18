const User = require("../models/userModel");
const UserCollection = require("../collections/user_collection");

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.joinedTimestamp = Date.now();
    const response = await UserCollection.createUser(user);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersFromTeam = async (req, res) => {
  try {
    const teamId = req.params.id.toString();
    const response = await UserCollection.getUserByTeamId(teamId);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id.toString();
    const response = await UserCollection.getUserById(userId);
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id.toString();
    let userObj = req.body.user;
    let updatedUser = await UserCollection.updateUser(userId, userObj);
    res.send(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  let users = await UserCollection.getAllUser();
  res.send(users);
}

const updateUserByEmail = async (req, res) => {
  const email = req.params.email;
  const updatedFields = req.body;
  let updatedUser = await UserCollection.updateUserByEmail(email, updatedFields);
  res.send(updatedUser);
}

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  await UserCollection.removeUserById(id);
  res.send({ message: "User deleted successfully" });
}

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    if(!email) {
      return res.sendStatus(400);
    }
    const response = await User.findOne({email});
    res.status(200).send(response);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsersFromTeam,
  updateUser,
  getAllUsers,
  updateUserByEmail,
  deleteUserById,
  getUserByEmail
};
