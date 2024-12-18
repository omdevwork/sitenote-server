const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const USER_ROUTE_FUNCTIONS = require("../routeFunctions/user_route_functons");
const EMAIL_INVITATION = require("../services/send_email_invitation");

// Create a new user
router.post("/", USER_ROUTE_FUNCTIONS.createUser);

// Get all users of team
router.get("/teamUsers/:id", USER_ROUTE_FUNCTIONS.getAllUsersFromTeam);

// Get all users
router.get("/getAllUsers", USER_ROUTE_FUNCTIONS.getAllUsers);

// Get user by ID
router.get("/:id", USER_ROUTE_FUNCTIONS.getUserById);

// Get user by email
router.get("/email/:email", USER_ROUTE_FUNCTIONS.getUserByEmail);

// Update user by ID
router.put("/:id", USER_ROUTE_FUNCTIONS.updateUser);

router.post("/send_invitation", EMAIL_INVITATION.send_email_invitation);

// Update user by Email
router.put("/updateUserByEmail/:email", USER_ROUTE_FUNCTIONS.updateUserByEmail);

router.delete("/:id", USER_ROUTE_FUNCTIONS.deleteUserById);

module.exports = router;


