const productService = require("../services/productService");

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.findAll();
      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນສິນຄ້າ",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Get a product by ID
  getProductById: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const product = await productService.findById(productID);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "ບໍ່ພົບສິນຄ້າ" });
      }

      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Create a new product
  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      if (!productData.product_name || !productData.price) {
        return res.status(400).json({
          success: false,
          message: "ກະລຸນາໃສ່ຊື່ສິນຄ້າ ແລະ ລາຄາ",
        });
      }

      const product = await productService.create(productData);
      res.status(201).json({
        success: true,
        message: "ສຳເລັດການເພີ່ມຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const updateData = req.body;

      const product = await productService.update(productID, updateData);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "ບໍ່ພົບສິນຄ້າ" });
      }

      res.json({
        success: true,
        message: "ສຳເລັດການແກ້ໄຂຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const product = await productService.delete(productID);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "ບໍ່ພົບສິນຄ້າ" });
      }

      res.json({ success: true, message: "ສຳເລັດການລົບສິນຄ້າ" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = productController;
