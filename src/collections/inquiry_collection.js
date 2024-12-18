const Inquiry = require("../models/inquiryModel");

const addInquiry = (values) => {
    const inquiry = new Inquiry(values).save();
    return inquiry;
}

const removeInquiry = async(id) => {
    const result = await Inquiry.findByIdAndDelete(id);
    return result;
}

const editInquiry = async(id, values) => {
    const result = await Inquiry.findByIdAndUpdate(id, values);
    return result;
}

const getInquiryByTeamId = async(teamId) => {
    const result = await Inquiry.find({ teamId });
    return result;
}

const getInquiryById = async (id) => {
    const result = await Inquiry.findById(id);
    return result;
}

module.exports = {
    addInquiry,
    getInquiryByTeamId,
    editInquiry,
    removeInquiry,
    getInquiryById
}