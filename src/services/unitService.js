const Unit = require('../models/unit');

class UnitService {
  async createUnit(unitData) {
    try {
      // Check if unit with same name already exists
      const existingUnit = await Unit.findOne({ unit_name: unitData.unit_name });
      if (existingUnit) {
        throw new Error('Unit with this name already exists');
      }

      // Validate unit name
      if (!unitData.unit_name || unitData.unit_name.trim().length === 0) {
        throw new Error('Unit name is required');
      }

      if (unitData.unit_name.length > 50) {
        throw new Error('Unit name cannot exceed 50 characters');
      }

      // Create new unit
      const unit = new Unit(unitData);
      return await unit.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllUnits() {
    try {
      return await Unit.find({});
    } catch (error) {
      throw error;
    }
  }

  async getUnitById(id) {
    try {
      const unit = await Unit.findById(id);
      if (!unit) {
        throw new Error('Unit not found');
      }
      return unit;
    } catch (error) {
      throw error;
    }
  }

  async updateUnit(id, updateData) {
    try {
      // Check if updating to an existing unit name
      if (updateData.unit_name) {
        const existingUnit = await Unit.findOne({
          unit_name: updateData.unit_name,
          _id: { $ne: id }
        });
        if (existingUnit) {
          throw new Error('Unit with this name already exists');
        }
      }

      const unit = await Unit.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!unit) {
        throw new Error('Unit not found');
      }
      
      return unit;
    } catch (error) {
      throw error;
    }
  }

  async deleteUnit(id) {
    try {
      const unit = await Unit.findByIdAndDelete(id);
      if (!unit) {
        throw new Error('Unit not found');
      }
      return unit;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UnitService();