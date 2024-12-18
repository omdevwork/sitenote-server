const Payment = require("../models/paymentModel");

const addPayment = (values) => {
    const payment = new Payment(values).save();
    return payment;
}

const removePayment = async(id) => {
    const result = await Payment.findByIdAndDelete(id);
    return result;
}

// const getInquiryByTeamId = async(teamId) => {
//     const result = await Inquiry.find({ teamId });
//     return result;
// }

const getPaymentByFlatId = async (flatId) => {
    const result = await Payment.find({ flatId });
    return result;
}

const getPaymentByTeamId = async (teamId) => {
    const result = await Payment.find({ teamId });
    return result;
}

const editPayment = async(id, values) => {
    const result = await Payment.findByIdAndUpdate(id, values);
    return result;
}

module.exports = {
    addPayment,
    removePayment,
    getPaymentByFlatId,
    editPayment,
    getPaymentByTeamId,
}