const {
  addPayment,
  getPaymentByFlatId,
  removePayment,
  editPayment,
} = require("../collections/payment_collection");

const postPayment = async (req, res) => {
  try {
    const { amount, dueDate, flatId, teamId } = req.body;
    if (!amount || !dueDate || !flatId || !teamId) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const payment = {
      amount,
      dueDate,
      flatId,
      teamId
    };

    await addPayment(payment);

    return res.status(200).json({ message: "add successfully" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

const getPayment = async (req, res) => {
  try {
    const flatId = req.params.flatId;
    if (!flatId) {
      return res.status(400).json({ error: "flat ID is missing!" });
    }

    const payment = await getPaymentByFlatId(flatId);

    return res.status(200).json(payment).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Team ID is missing!" });
    }

    await removePayment(id);
    return res.status(200).json({ message: "deleted" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

const putPayment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID is missing!" });
    }

    await editPayment(id, req.body);

    return res.status(200).json({ message: "edit successfully" }).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  postPayment,
  getPayment,
  deletePayment,
  putPayment,
};
