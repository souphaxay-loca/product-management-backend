const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      unique: true,
    },
    product_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      ref: "categories",
      required: true,
    },
    unit: {
      type: Number,
      ref: "units",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// productSchema.pre("save", async function(next) {
//     if (this.isNew) {
//         const lastProduct = await this.constructor.findOne({}, {}, { sort: { 'product_id': -1 } });
//         this.product_id = lastProduct ? lastProduct.product_id + 1 : 1;
//     }
//     next();
// });

productSchema.plugin(AutoIncrement, { inc_field: "product_id" });

module.exports = mongoose.model("products", productSchema);
