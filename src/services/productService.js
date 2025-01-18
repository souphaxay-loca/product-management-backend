const Product = require("../models/product");

const productService = {
  findAll: async () => {
    return await Product.find()
      .populate({
        path: "category_id",
        foreignField: "category_id", // Match on category_id
        localField: "category_id", // Match with local category_id
      })
      .populate({
        path: "unit_id",
        foreignField: "unit_id", // Match on unit_id
        localField: "unit_id", // Match with local unit_id
      });
  },
  findById: async (productID) => {
    const id = parseInt(productID);
    return await Product.findOne({ product_id: id })
      .populate({
        path: "category_id",
        foreignField: "category_id",
        localField: "category_id",
      })
      .populate({
        path: "unit_id",
        foreignField: "unit_id",
        localField: "unit_id",
      });
  },
  create: async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
  },
  update: async (productID, updateData) => {
    // Convert string to number
    const id = parseInt(productID);
    return await Product.findOneAndUpdate({ product_id: id }, updateData, {
      new: true,
    });
  },
  delete: async (productID) => {
    // Convert string to number
    const id = parseInt(productID);
    return await Product.findOneAndDelete({ product_id: id });
  },
};

module.exports = productService;
