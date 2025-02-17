const productService = require("../services/productService");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.findAll();
      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນສິນຄ້າ",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error.message || "ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນ" 
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productService.findById(req.params.product_id);
      res.json({
        success: true,
        message: "ສຳເລັດການດຶງຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      if (error.message === "ບໍ່ພົບສິນຄ້າ" || error.message === "ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ") {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({
        success: true,
        message: "ສຳເລັດການເພີ່ມຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      if (error.message.includes("ກະລຸນາປ້ອນຂໍ້ມູນ") || 
          error.message.includes("ຈຳນວນຕ້ອງຫຼາຍກວ່າ") ||
          error.message === "ມີສິນຄ້ານີ້ຢູ່ແລ້ວ") {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ 
        success: false, 
        message: error.message || "ເກີດຂໍ້ຜິດພາດໃນການເພີ່ມຂໍ້ມູນ" 
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await productService.update(req.params.product_id, req.body);
      res.json({
        success: true,
        message: "ສຳເລັດການແກ້ໄຂຂໍ້ມູນສິນຄ້າ",
        data: product,
      });
    } catch (error) {
      if (error.message === "ບໍ່ພົບສິນຄ້າ" || 
          error.message === "ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ" ||
          error.message.includes("ຈຳນວນຕ້ອງຫຼາຍກວ່າ") ||
          error.message === "ມີສິນຄ້ານີ້ຢູ່ແລ້ວ") {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.status(500).json({ 
        success: false, 
        message: error.message || "ເກີດຂໍ້ຜິດພາດໃນການແກ້ໄຂຂໍ້ມູນ" 
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await productService.delete(req.params.product_id);
      res.json({ 
        success: true, 
        message: "ສຳເລັດການລົບສິນຄ້າ" 
      });
    } catch (error) {
      if (error.message === "ບໍ່ພົບສິນຄ້າ" || 
          error.message === "ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ") {
        return res.status(404).json({ success: false, message: error.message });
      }
      res.status(500).json({ 
        success: false, 
        message: error.message || "ເກີດຂໍ້ຜິດພາດໃນການລົບຂໍ້ມູນ" 
      });
    }
  },
};

module.exports = productController;