const express = require("express");
const router = express.Router();
const PaymentRouteFunctions = require("../routeFunctions/payment_route_function");

// Create a new flat
router.post(
  "/",
  PaymentRouteFunctions.postPayment
);

// get
router.get(
  "/:flatId",
  PaymentRouteFunctions.getPayment
);

// delete
router.delete(
  "/:id",
  PaymentRouteFunctions.deletePayment
);

// edit
router.put(
  "/:id",
  PaymentRouteFunctions.putPayment
);

module.exports = router;