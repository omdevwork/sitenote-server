const Rent = require("../models/rentModel");

const addRent = (values) => {
    const rent = new Rent(values).save();
    return rent;
}

const removeRent = async(id) => {
    const result = await Rent.findByIdAndDelete(id);
    return result;
}

const editRent = async(id, values) => {
    const result = await Rent.findByIdAndUpdate(id, values);
    return result;
}

const getRentByTeamId = async(teamId) => {
    const result = await Rent.find({ teamId });
    return result;
}

const getRentById = async (id) => {
    const result = await Rent.findById(id);
    return result;
}

module.exports = {
    addRent,
    getRentByTeamId,
    editRent,
    removeRent,
    getRentById
}