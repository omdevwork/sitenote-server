const Flat = require("../models/flatModel");
const FlatCollection = require("../collections/flat_collection");
const Payment = require("../models/paymentModel");
const Project = require("../models/projectModel");
const Activity = require("../models/activityModel");
const User = require("../models/userModel");
const { sendNotification } = require("../services/notification_services");

// Create a new flat
const createFlat = async (req, res) => {
  try {
    let flat = new Flat(req.body);
    flat.createdAt = Date.now();
    const response = await FlatCollection.createFlat(flat);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flats
const getAllFlatsByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id.toString();
    const flats = await FlatCollection.getFlatsByProjectId(projectId);
    res.json(flats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get flat by ID
const getFlat = async (req, res) => {
  try {
    const flatId = req.params.id.toString();
    const flat = await FlatCollection.getFlatById(flatId);
    res.json(flat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFlatOfTodayPayment = async (req, res) => {
  try {
    // Get today's date
    const teamId = req.params.teamId;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to get the start of the day

    // Get today's payments whose due date is today and status is false
    const todayPayments = await Payment.find({
      teamId: teamId,
      dueDate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
      status: false,
    });

    // Get past payments with status false
    const pastPayments = await Payment.find({
      teamId: teamId,
      dueDate: { $lt: today },
      status: false,
    });

    // Extract flat IDs from today's and past payments
    const todayFlatIds = todayPayments.map((payment) => payment.flatId);
    const pastFlatIds = pastPayments.map((payment) => payment.flatId);

    // Fetch flats corresponding to today's and past payments
    const todayFlats = await Flat.find({ _id: { $in: todayFlatIds } });
    const pastFlats = await Flat.find({ _id: { $in: pastFlatIds } });

    // Inside the getFlatOfTodayPayment function, when constructing today's flats data
    const todayFlatsData = await Promise.all(
      todayFlats.map(async (flat) => ({
        series: flat.series,
        projectName: await getProjectName(flat.projectId), // Await the getProjectName function
        paymentAmount: getPaymentAmount(todayPayments, flat._id),
        dueDate: today,
        flatId: flat._id,
        projectId: flat.projectId,
      }))
    );

    // Inside the getFlatOfTodayPayment function, when constructing past flats data
    const pastFlatsData = await Promise.all(
      pastFlats.map(async (flat) => ({
        series: flat.series,
        projectName: await getProjectName(flat.projectId), // Await the getProjectName function
        paymentAmount: getPaymentAmount(pastPayments, flat._id),
        dueDate: getDueDate(pastPayments, flat._id),
        flatId: flat._id,
        projectId: flat.projectId,
      }))
    );

    // Combine today's and past flats data
    const allFlatsData = {
      todayPayments: todayFlatsData,
      pastPayments: pastFlatsData,
    };

    res.send(allFlatsData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to get projectName from Project model
// Helper function to get projectName from Project model
async function getProjectName(projectId) {
  try {
    const project = await Project.findById(projectId);
    return project.projectName;
  } catch (error) {
    console.error("Error fetching project name:", error);
    return "";
  }
}

// Helper function to get payment amount by matching flatId
function getPaymentAmount(payments, flatId) {
  const payment = payments.find(
    (payment) => payment.flatId.toString() === flatId.toString()
  );
  return payment ? payment.amount : 0;
}

// Helper function to get due date by matching flatId
function getDueDate(payments, flatId) {
  const payment = payments.find(
    (payment) => payment.flatId.toString() === flatId.toString()
  );
  return payment ? payment.dueDate : null;
}

// Update flat by ID
const updateFlat = async (req, res) => {
  try {
    // console.log(req.body, req.body.flat.isDeed)
    const flatId = req.params.id.toString();
    let oldFlat = await Flat.findOne({ _id: flatId });
    const adminUsers = await User.find({
      teamId: oldFlat.teamId,
      role: "admin",
    });

    if (
      !(
        !oldFlat.teamId ||
        !req.body.imageUrl ||
        !req.body.userName ||
        !req.body.messageMain ||
        !req.body.message ||
        !req.body.redirect
      )
    ) {
      new Activity({
        teamId: oldFlat.teamId,
        imageUrl: req.body.imageUrl,
        userName: req.body.userName,
        messageMain: req.body.messageMain,
        message: req.body.message,
        redirect: req.body.redirect,
      }).save();

      const filteredAdminUsers = adminUsers.filter(
        (user) => user.userName !== req.body.userName
      );

      filteredAdminUsers.forEach(async (adminUser) => {
        // Send notification to admin user
        if (adminUser.fcmToken) {
          await sendNotification(
            adminUser.fcmToken,
            "New Activity",
            `${req.body.userName} ${req.body.message}`,
            "activity"
          );
        }
      });
    }
    let flatObj = req.body.flat;
    let updatedFlat = await FlatCollection.updateFlat(flatId, flatObj);
    res.json(updatedFlat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const flatId = req.params.id.toString();
    const response = await FlatCollection.deleteFlat(flatId);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllFlats = async (req, res) => {
  try {
    const teamId = req.params.teamId.toString();
    const response = await FlatCollection.getAllTeamFlats(teamId);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectViseFlat = async (req, res) => {
  try {
    const teamId = req.params.teamId.toString();
    if (!teamId) {
      return res.sendStatus(400);
    }

    // Find all projects with the same teamId
    const projects = await Project.find({ teamId: teamId });

    // Find all flats with the same teamId
    const flats = await Flat.find({ teamId: teamId });

    // Prepare result array
    const result = [];

    // Iterate through each project
    for (const project of projects) {
      // Find flats corresponding to the current project
      const projectFlats = flats.filter(
        (flat) => flat.projectId.toString() === project._id.toString()
      );

      // Count sold and unsold flats for the current project
      const soldFlatsCount = projectFlats.filter(
        (flat) => flat.customerName !== ""
      ).length;
      const unsoldFlatsCount = projectFlats.length - soldFlatsCount;

      // Calculate percentages for the current project
      const soldPercentage = (soldFlatsCount / projectFlats.length) * 100;
      const unsoldPercentage = (unsoldFlatsCount / projectFlats.length) * 100;

      // Construct the object for current project
      const projectObject = {
        projectName: project.projectName,
        sold: soldFlatsCount,
        unSold: unsoldFlatsCount,
        soldPercentage: soldPercentage.toFixed(2) + "%",
        unsoldPercentage: unsoldPercentage.toFixed(2) + "%",
      };

      // Push the project object to the result array
      result.push(projectObject);
    }

    // Calculate totals from the result array
    const allSold = result.reduce((total, project) => total + project.sold, 0);
    const allUnsold = result.reduce(
      (total, project) => total + project.unSold,
      0
    );
    const totalFlats = allSold + allUnsold;

    // Return the result array along with totals
    res.json({
      result: result,
      allSold: allSold,
      allUnsold: allUnsold,
      totalFlats: totalFlats,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createFlat,
  getAllFlatsByProjectId,
  getFlat,
  updateFlat,
  deleteFlat,
  getFlatOfTodayPayment,
  getAllFlats,
  getProjectViseFlat,
};
