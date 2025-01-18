const { findById } = require("../models/product");
const Category = require("../models/category");

const categoryService = {
  findAll: async () => {
    return await Category.find();
  },
  findById: async (categoryID) => {
    const id = parseInt(categoryID);
    return await Category.findOne({ category_id: id });
  },
  create: async (categoryData) => {
    const category = new Category(categoryData);
    await category.save();
    return category;
  }
};

module.exports = categoryService;