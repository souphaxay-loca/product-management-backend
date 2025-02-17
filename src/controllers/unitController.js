const unitService = require('../services/unitService');

class UnitController {
  async createUnit(req, res) {
    try {
      const unit = await unitService.createUnit(req.body);
      res.status(201).json({
        success: true,
        data: unit,
        message: 'Unit created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to create unit'
      });
    }
  }

  async getAllUnits(req, res) {
    try {
      const units = await unitService.getAllUnits();
      res.status(200).json({
        success: true,
        data: units,
        message: 'Units retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve units'
      });
    }
  }

  async getUnitById(req, res) {
    try {
      const unit = await unitService.getUnitById(req.params.id);
      res.status(200).json({
        success: true,
        data: unit,
        message: 'Unit retrieved successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'Unit not found'
      });
    }
  }

  async updateUnit(req, res) {
    try {
      const unit = await unitService.updateUnit(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: unit,
        message: 'Unit updated successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update unit'
      });
    }
  }

  async deleteUnit(req, res) {
    try {
      await unitService.deleteUnit(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Unit deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message || 'Failed to delete unit'
      });
    }
  }
}

module.exports = new UnitController();