const express = require("express");
const router = express.Router();

const { getAllUnits, getUnitById, createUnit } = require("../controllers/unitController");

// get all units
router.get("/", getAllUnits);

// get unit by id
router.get("/:unit_id", getUnitById);

// create a new unit
router.post("/", createUnit);

module.exports = router;
