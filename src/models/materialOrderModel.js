const mongoose = require("mongoose");

const materialOrderSchema = new mongoose.Schema({
  materialOrderId: {
    type: String,
  },
  material: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityType: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  isOrdered: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    require: true
  },
  orderedById: String,
});

const MaterialOrder = mongoose.model("MaterialOrder", materialOrderSchema);

module.exports = MaterialOrder;