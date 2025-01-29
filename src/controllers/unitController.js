const unitService = require("../services/unitService");

const unitController = {
  // get all units
  getAllUnits: async (req, res) => {
    try {
      const units = await unitService.findAll();
      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນຫົວໜ່ວຍ",
        data: units,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // get a unit by id
  getUnitById: async (req, res) => {
    const unitID = req.params.unit_id;
    try {
      const unit = await unitService.findById(unitID);

      if (!unit) {
        return res
          .status(404)
          .json({ success: false, message: "ບໍ່ພົບຂໍ້ມູນຫົວໜ່ວຍດັ່ງກ່າວ" });
      }

      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນຫົວໜ່ວຍ",
        data: unit,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // create a new unit
  createUnit: async (req, res) => {
    try {
      const unitData = req.body;

      if (!unitData.unit_name) {
        return res.status(400).json({
          success: false,
          message: "ກະລຸນາໃສ່ຊື່ຫົວໜ່ວຍ",
        });
      }

      const unit = await unitService.create(unitData);
      res.status(201).json({
        success: true,
        message: "ສຳເລັດການເພີ່ມຂໍ້ມູນຫົວໜ່ວຍ",
        data: unit,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // delete a unit
  deleteUnit: async (req, res) => {
    try {
      const unitId = req.params.unit_id;
      const unit = await unitService.delete(unitId);

      if (!unit) {
        return res.status(404).json({
          success: false,
          message: "ບໍ່ພົບຫົວໜ່ວຍ",
        });
      }
      return res.json({
        success: true,
        message: "ສຳເລັດການລົບຫົວໜ່ວຍ",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = unitController;
