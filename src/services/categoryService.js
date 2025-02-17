const Category = require('../models/category');

class CategoryService {
  async createCategory(categoryData) {
    try {
      // Check if category with same name already exists
      const existingCategory = await Category.findOne({ category_name: categoryData.category_name });
      if (existingCategory) {
        throw new Error('Category with this name already exists');
      }

      // Validate category name
      if (!categoryData.category_name || categoryData.category_name.trim().length === 0) {
        throw new Error('Category name is required');
      }

      if (categoryData.category_name.length > 50) {
        throw new Error('Category name cannot exceed 50 characters');
      }

      // Create new category
      const category = new Category(categoryData);
      return await category.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      return await Category.find({});
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id, updateData) {
    try {
      // Check if updating to an existing category name
      if (updateData.category_name) {
        const existingCategory = await Category.findOne({
          category_name: updateData.category_name,
          _id: { $ne: id }
        });
        if (existingCategory) {
          throw new Error('Category with this name already exists');
        }
      }

      const category = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!category) {
        throw new Error('Category not found');
      }
      
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();