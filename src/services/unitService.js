const Unit = require("../models/unit");

const unitService = {
  findAll: async () => {
    return await Unit.find();
  },
  findById: async (unitID) => {
    const id = parseInt(unitID);
    return await Unit.findOne({ unit_id: id });
  },
  create: async (unitData) => {
    const unit = new Unit(unitData);
    return await unit.save();
  },
  delete: async (unitID) => {
    // Convert string to number
    const id = parseInt(unitID);
    return await Unit.findOneAndDelete({ unit_id: id });
  },
};

module.exports = unitService;
