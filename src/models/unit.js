const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const unitSchema = new mongoose.Schema({
  unit_id: {
    type: Number,
    unique: true,
  },
  unit_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

unitSchema.plugin(AutoIncrement, { inc_field: "unit_id"});

module.exports = mongoose.model("units", unitSchema);
