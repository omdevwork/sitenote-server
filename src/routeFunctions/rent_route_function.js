const {
  addRent,
  getRentByTeamId,
  removeRent,
  editRent,
  getRentById,
} = require("../collections/rent_collection");
const Rent = require("../models/rentModel");

const postRent = async (req, res) => {
  try {
    const {
      teamId,
      projectId,
      projectName,
      propertyNumber,
      BhadutName,
      rentAmount,
      deposit,
      mobileNumber,
      rentStart,
      depositeDate
    } = req.body;
    if (
      !teamId ||
      !projectName ||
      !propertyNumber ||
      !BhadutName ||
      !rentAmount ||
      !deposit ||
      !mobileNumber
    ) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const rent = {
      teamId,
      projectId,
      projectName,
      propertyNumber,
      BhadutName,
      rentAmount,
      deposit,
      mobileNumber,
      rentStart,
      depositeDate
    };

    await addRent(rent);

    return res.status(200).json({ message: "add successfully" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

// get rent by teamId
const getRentOfTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is missing!" });
    }

    const rent = await getRentByTeamId(teamId);

    return res.status(200).json(rent).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteRent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Team ID is missing!" });
    }

    await removeRent(id);
    return res.status(200).json({ message: "deleted" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const putRent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is missing!" });
    }

    await editRent(id, req.body);

    return res.status(200).json({ message: "edit successfully" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getSingleRent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is missing!" });
    }

    const rent = await getRentById(id);
    if (!rent) {
      return res.status(400).json({ error: "rent not found!" });
    }

    return res.status(200).json(rent).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  postRent,
  getRentOfTeam,
  deleteRent,
  putRent,
  getSingleRent,
};
