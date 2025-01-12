const mongoose = require("mongoose");
const MaterialOrder = require("../models/materialOrderModel");
require("dotenv").config();

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
