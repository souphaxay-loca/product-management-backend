const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new mongoose.Schema({
  category_id: {
    type: Number,
    unique: true,
  },
  category_name: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
});

categorySchema.plugin(AutoIncrement, { inc_field: "category_id" });

module.exports = mongoose.model("categories", categorySchema);
