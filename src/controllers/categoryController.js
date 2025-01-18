const categoryService = require("../services/categoryService");

const categoryController = {
  // get all categories
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.findAll();
      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນໝວດໝູ່",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // get a category by id
  getCategoryById: async (req, res) => {
    const categoryID = req.params.category_id;
    try {
      const category = await categoryService.findById(categoryID);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "ບໍ່ພົບຂໍ້ມູນໝວດໝູ່ດັ່ງກ່າວ" });
      }

      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນໝວດໝູ່",
        data: category,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // create a new category
  createCategory: async (req, res) => {
    try {
      const categoryData = req.body;

      if (!categoryData.category_name) {
        return res.status(400).json({
          success: false,
          message: "ກະລຸນາໃສ່ຊື່ໝວດໝູ່",
        });
      }

      const category = await categoryService.create(categoryData);
      res.status(201).json({
        success: true,
        message: "ສຳເລັດການເພີ່ມຂໍ້ມູນໝວດໝູ່",
        data: category,
      });
      
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = categoryController;
