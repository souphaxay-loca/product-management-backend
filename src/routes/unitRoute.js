const express = require("express");
const router = express.Router();

const { getAllUnits, getUnitById, createUnit, deleteUnit } = require("../controllers/unitController");

// get all units
router.get("/", getAllUnits);

// get unit by id
router.get("/:unit_id", getUnitById);

// create a new unit
router.post("/", createUnit);

// delete a unit
router.delete("/:unit_id", deleteUnit);

module.exports = router;
