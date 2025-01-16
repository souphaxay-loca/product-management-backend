const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
        required: true,
        maxlength: 50,
    }
})

module.exports = mongoose.model("units", unitSchema);