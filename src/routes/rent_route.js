const express = require("express");
const router = express.Router();
const RentRouteFunctions = require("../routeFunctions/rent_route_function");

// Create a new rent
router.post(
  "/",
  RentRouteFunctions.postRent
);

// get
router.get(
  "/:teamId",
  RentRouteFunctions.getRentOfTeam
);

// delete
router.delete(
  "/:id",
  RentRouteFunctions.deleteRent
);

// edit
router.put(
  "/:id",
  RentRouteFunctions.putRent
);

// get by id
router.get(
  "/get/:id",
  RentRouteFunctions.getSingleRent
);

module.exports = router;