const MaterialOrder = require("../models/materialOrderModel");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notification_services");

let getMaterialOrderById = async (materialOrderId) => {
  try {
    let materialOrder = await MaterialOrder.findById(materialOrderId);
    return materialOrder;
  } catch (err) {
    return err;
  }
};

let getMaterialOrderByProjectId = async (projectId) => {
  try {
    let materialOrders = await MaterialOrder.find({
      projectId: projectId,
    }).exec();
    return materialOrders;
  } catch (err) {
    return err;
  }
};

let getMaterialOrderByTeamId = async (teamId) => {
  try {
    let materialOrders = await MaterialOrder.find({
      teamId: teamId,
    }).exec();
    return materialOrders;
  } catch (err) {
    return err;
  }
};

let createMaterialOrder = async (materialOrder) => {
  try {
    let createdMaterialOrder = await materialOrder.save();
    createdMaterialOrder.materialOrderId = await createdMaterialOrder.id;
    let updatedMaterialOrder = await createdMaterialOrder.save();

    // Find all users with the teamId of the material order
    let users = await User.find({ teamId: materialOrder.teamId });
    // Remove the user who created this material order
    users = users.filter((user) => user.userName !== materialOrder.createdBy && user.role !== 'sitemanager');
    // Iterate through users, check if they have fcmToken and send notification
    for (const user of users) {
      if (user.fcmToken && user.fcmToken !== "") {
        await sendNotification(user.fcmToken, `${materialOrder.createdBy} create a material request.`, "New material request", "material");
      }
    }

    return updatedMaterialOrder;
  } catch (err) {
    return err;
  }
};

let updateMaterialOrder = async (materialOrderId, updateFields) => {
  try {
    return await MaterialOrder.findByIdAndUpdate(
      materialOrderId,
      updateFields,
      {
        new: true,
      }
    );
  } catch (err) {
    return err;
  }
};

let deleteMaterialOrder = async (id) => {
  try {
    return await MaterialOrder.findByIdAndDelete(id);
  } catch (err) {
    return err;
  }
}
module.exports = {
  getMaterialOrderById,
  getMaterialOrderByProjectId,
  createMaterialOrder,
  updateMaterialOrder,
  getMaterialOrderByTeamId,
  deleteMaterialOrder
};
