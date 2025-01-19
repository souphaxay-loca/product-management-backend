const Product = require("../models/product");

const productService = {
  findAll: async () => {
    return await Product.find()
      .populate({
        path: "category", // The field in the Product schema
        model: "categories", // Explicitly specify the model
        match: {}, // Optional, specify additional filter criteria
        localField: "category", // Local field in Product
        foreignField: "category_id", // Field in Categories model
      })
      .populate({
        path: "unit", // The field in the Product schema
        model: "units", // Explicitly specify the model
        localField: "unit", // Local field in Product
        foreignField: "unit_id", // Field in Units model
      });
  },
  findById: async (productID) => {
    const id = parseInt(productID);
    return await Product.findOne({ product_id: id })
      .populate({
        path: "category",
        model: "categories",
        localField: "category",
        foreignField: "category_id",
      })
      .populate({
        path: "unit",
        model: "units",
        localField: "unit",
        foreignField: "unit_id",
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
