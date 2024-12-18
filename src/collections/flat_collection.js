const Flat = require("../models/flatModel");
const User = require("../models/userModel");

let getFlatById = async (flatId) => {
  try {
    let flat = await Flat.findById(flatId);
    return flat;
  } catch (err) {
    return err;
  }
};

let getFlatsByProjectId = async (projectId) => {
  try {
    let flats = await Flat.find({
      projectId: projectId,
    }).exec();
    return flats;
  } catch (err) {
    return err;
  }
};

let createFlat = async (flatObj) => {
  try {
    // Query the database to find flats with the same projectId
    let existingFlats = await Flat.find({ projectId: flatObj.projectId });

    // Check if any existing flat has the same series as flatObj
    let flatExists = existingFlats.some(
      (existingFlat) => existingFlat.series === flatObj.series
    );

    // If the flat with the same series exists, return without creating a new one
    if (flatExists) {
      return {
        error: "Flat with the same series already exists in the project.",
      };
    }

    // If no matching flat is found, proceed with creating a new one
    let createdFlat = await flatObj.save();
    createdFlat.flatId = createdFlat.id; // Assuming flatId needs to be set to the ID

    // Find all users with the teamId of the flat
    let users = await User.find({ teamId: flatObj.teamId });
    // Remove the user who created this flat
    users = users.filter((user) => user.userName !== flatObj.createdBy);

    // Iterate through users, check if they have fcmToken and send notification
    // for (const user of users) {
    //   if (user.fcmToken && user.fcmToken !== "") {
    //     await sendNotification(user.fcmToken, `New flat created by ${flatObj.createdBy}`, "New flat created", `project/${flatObj.projectId}`);
    //   }
    // }

    let updatedFlat = await createdFlat.save();
    return updatedFlat;
  } catch (err) {
    return err;
  }
};

let updateFlat = async (flatId, updateFields) => {
  try {
    // Get the existing flat by flatId
    let existingFlat = await Flat.findById(flatId);
    if (!existingFlat) {
      return { error: "Flat not found." };
    }

    // If the update involves changing the series
    if (updateFields.series && updateFields.series !== existingFlat.series) {
      // Query the database to find flats with the same projectId
      let existingFlats = await Flat.find({
        projectId: existingFlat.projectId,
      });

      // Check if any existing flat has the same series as the updated series
      let flatExists = existingFlats.some(
        (flat) => flat.series === updateFields.series && flat.id !== flatId
      );

      // If a flat with the same series exists, return without updating
      if (flatExists) {
        return {
          error:
            "Another flat with the same series already exists in the project.",
        };
      }
    }

    // Update the flat
    let updatedFlat = await Flat.findByIdAndUpdate(flatId, updateFields, {
      new: true,
    });
    return updatedFlat;
  } catch (err) {
    return err;
  }
};

let deleteFlat = async(id) => {
  try {
    let deletedFlat = await Flat.findByIdAndDelete(id);
    return deletedFlat;
  } catch (err) {
    return err;
  }
}

let getAllTeamFlats = async(teamId) => {
  try {
    let flats = await Flat.find({ teamId: teamId }).exec();
    return flats;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getFlatById,
  createFlat,
  updateFlat,
  getFlatsByProjectId,
  deleteFlat,
  getAllTeamFlats,
};
