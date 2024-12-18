const express = require("express");
const router = express.Router();
const InquiryRouteFunctions = require("../routeFunctions/inquiry_route_function");

// Create a new flat
router.post(
  "/",
  InquiryRouteFunctions.postInquiry
);

// get
router.get(
  "/:teamId",
  InquiryRouteFunctions.getInquiry
);

// delete
router.delete(
  "/:id",
  InquiryRouteFunctions.deleteInquiry
);

// edit
router.put(
  "/:id",
  InquiryRouteFunctions.putInquiry
);

// get by id
router.get(
  "/get/:id",
  InquiryRouteFunctions.getSingleInquiry
);

module.exports = router;