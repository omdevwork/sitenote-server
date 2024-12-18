const express = require("express");
const router = express.Router();
const Flat = require("../models/flatModel");
const FlatRouteFunctions = require("../routeFunctions/flat_route_function");

// Create a new flat
router.post(
  "/",
  FlatRouteFunctions.createFlat
);

// Get all flats
router.get(
  "/getFlatsByProjectId/:id",
  FlatRouteFunctions.getAllFlatsByProjectId
);

// get All Team flats
router.get(
  "/getallteamflats/:teamId",
  FlatRouteFunctions.getAllFlats
);

// get All Team flats
router.get(
  "/getprojectwiseflats/:teamId",
  FlatRouteFunctions.getProjectViseFlat
);

// Get all payment flats
router.get(
  "/getflatpayment/:teamId",
  FlatRouteFunctions.getFlatOfTodayPayment
);

// Get flat by ID
router.get(
  "/:id",
  FlatRouteFunctions.getFlat
);

// Update flat by ID
router.put(
  "/:id",
  FlatRouteFunctions.updateFlat
);

// Delete flat by ID
router.delete(
  "/:id",
  FlatRouteFunctions.deleteFlat
);

module.exports = router;
