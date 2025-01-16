const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        maxlength: 50,
    }
})

module.exports = mongoose.model("categories", categorySchema);