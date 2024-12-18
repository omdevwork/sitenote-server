const {
  addInquiry,
  getInquiryByTeamId,
  removeInquiry,
  editInquiry,
  getInquiryById,
} = require("../collections/inquiry_collection");

const postInquiry = async (req, res) => {
  try {
    const { customerName, contact, project, teamId, createdAt, brokerNumber, createdBy } =
      req.body;
    if (!customerName || !contact || !project || !teamId || !createdBy) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const inquiry = {
      customerName,
      contact,
      project,
      teamId,
      createdAt,
      brokerNumber,
      createdBy
    };

    await addInquiry(inquiry);

    return res.status(200).json({ message: "add successfully" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getInquiry = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    if (!teamId) {
      return res.status(400).json({ error: "Team ID is missing!" });
    }

    const inquiry = await getInquiryByTeamId(teamId);

    return res.status(200).json(inquiry).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Team ID is missing!" });
    }

    await removeInquiry(id);
    return res.status(200).json({ message: "deleted" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const putInquiry = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is missing!" });
    }
    const { customerName, contact, project, teamId, brokerNumber } = req.body;
    if (!customerName || !contact || !project || !teamId) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const inquiry = {
      customerName,
      contact,
      project,
      teamId,
      brokerNumber
    };

    await editInquiry(id, inquiry);

    return res.status(200).json({ message: "edit successfully" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const getSingleInquiry = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "ID is missing!" });
    }

    const inquiry = await getInquiryById(id);
    if (!inquiry) {
      return res.status(400).json({ error: "Inquiry not found!" });
    }

    return res.status(200).json(inquiry).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  postInquiry,
  getInquiry,
  deleteInquiry,
  putInquiry,
  getSingleInquiry,
};
