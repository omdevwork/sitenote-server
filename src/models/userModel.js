const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  joinedTimestamp: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  teamId: {
    type: String,
    default: null
  },
  role: {
    type: String,
    required: true,
  },
  fcmToken: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  booking: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
