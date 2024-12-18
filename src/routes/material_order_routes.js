const express = require("express");
const router = express.Router();
const MaterialOrderFunctions = require("../routeFunctions/material_order_function");

// Create a new material order
router.post("/", MaterialOrderFunctions.createMaterialOrder);

//Get all material orders
router.get(
  "/getMaterialOrdersByProjectId/:id",
  MaterialOrderFunctions.getMaterialOrdersByProjectId
);

// Get material order by ID
router.get("/:id", MaterialOrderFunctions.getMaterialOrderById);

// Get material order by TeamId
router.get(
  "/getMaterialByTeamId/:teamId",
  MaterialOrderFunctions.getMaterialOrdersByteamId
);

// Update material order by ID
router.put("/:id", MaterialOrderFunctions.updateMaterialOrder);

// Delete material order by Id
router.delete("/:id", MaterialOrderFunctions.deleteMaterialOrder);
module.exports = router;
