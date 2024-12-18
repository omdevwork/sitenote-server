const MaterialOrder = require("../models/materialOrderModel");
const MaterialOrderCollection = require("../collections/material_order_collection");
// Create a new flat
const createMaterialOrder = async (req, res) => {
  try {
    let materialOrder = new MaterialOrder(req.body);
    materialOrder.createdAt = Date.now();
    const response = await MaterialOrderCollection.createMaterialOrder(
      materialOrder
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all flats
const getMaterialOrdersByProjectId = async (req, res) => {
  try {
    const projectId = req.params.id.toString();
    const flats = await MaterialOrderCollection.getMaterialOrderByProjectId(
      projectId
    );
    res.json(flats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMaterialOrdersByteamId = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const material = await MaterialOrderCollection.getMaterialOrderByTeamId(
      teamId
    );
    res.json(material);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get flat by ID
const getMaterialOrderById = async (req, res) => {
  try {
    const materialOrderId = req.params.id.toString();
    const materialOrder = await MaterialOrderCollection.getMaterialOrderById(
      materialOrderId
    );
    res.json(materialOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update flat by ID
const updateMaterialOrder = async (req, res) => {
  try {
    const materialOrderId = req.params.id.toString();
    let materialOrderObj = req.body.materialOrder;
    let updatedMaterialOrder =
      await MaterialOrderCollection.updateMaterialOrder(
        materialOrderId,
        materialOrderObj
      );
    res.json(updatedMaterialOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete flat by ID
const deleteMaterialOrder = async (req, res) => {
  try {
    const materialOrderId = req.params.id.toString();
    await MaterialOrderCollection.deleteMaterialOrder(materialOrderId);
    res.json({ message: "Material Order has been deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateMaterialOrder,
  createMaterialOrder,
  getMaterialOrderById,
  getMaterialOrdersByProjectId,
  getMaterialOrdersByteamId,
  deleteMaterialOrder,
};
