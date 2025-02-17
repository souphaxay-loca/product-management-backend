const Product = require("../models/product");

const productService = {
  findAll: async () => {
    try {
      return await Product.find()
        .populate({
          path: "category",
          model: "categories",
          match: {},
          localField: "category",
          foreignField: "category_id",
        })
        .populate({
          path: "unit",
          model: "units",
          localField: "unit",
          foreignField: "unit_id",
        });
    } catch (error) {
      throw new Error("ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນສິນຄ້າ");
    }
  },

  findById: async (productID) => {
    try {
      if (!productID || isNaN(parseInt(productID))) {
        throw new Error("ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ");
      }
      
      const id = parseInt(productID);
      const product = await Product.findOne({ product_id: id })
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

      if (!product) {
        throw new Error("ບໍ່ພົບສິນຄ້າ");
      }
      
      return product;
    } catch (error) {
      throw error;
    }
  },

  create: async (productData) => {
    try {
      // Validate required fields
      if (!productData.product_name || !productData.price || 
          !productData.quantity || !productData.sale_price || 
          !productData.category || !productData.unit) {
        throw new Error("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
      }

      // Validate numeric fields
      if (productData.price < 0 || productData.sale_price < 0 || 
          productData.quantity < 0) {
        throw new Error("ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0");
      }

      if (productData.sale_price < productData.price) {
        throw new Error("ລາຄາຂາຍຕ້ອງຫຼາຍກວ່າ ຫຼື ເທົ່າກັບລາຄາຕົ້ນທຶນ");
      }

      // Check for duplicate product name
      const existingProduct = await Product.findOne({ 
        product_name: productData.product_name 
      });
      
      if (existingProduct) {
        throw new Error("ມີສິນຄ້ານີ້ຢູ່ແລ້ວ");
      }

      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  },

  update: async (productID, updateData) => {
    try {
      if (!productID || isNaN(parseInt(productID))) {
        throw new Error("ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ");
      }

      const id = parseInt(productID);

      // Validate numeric fields if they're being updated
      if (updateData.price !== undefined && updateData.price < 0) {
        throw new Error("ລາຄາຕ້ອງຫຼາຍກວ່າ 0");
      }
      if (updateData.sale_price !== undefined && updateData.sale_price < 0) {
        throw new Error("ລາຄາຂາຍຕ້ອງຫຼາຍກວ່າ 0");
      }
      if (updateData.quantity !== undefined && updateData.quantity < 0) {
        throw new Error("ຈຳນວນຕ້ອງຫຼາຍກວ່າ 0");
      }

      // Add new validation for sale_price
      const existingProduct = await Product.findOne({ product_id: id });
      const newPrice = updateData.price !== undefined ? updateData.price : existingProduct.price;
      const newSalePrice = updateData.sale_price !== undefined ? updateData.sale_price : existingProduct.sale_price;
      
      if (newSalePrice < newPrice) {
        throw new Error("ລາຄາຂາຍຕ້ອງຫຼາຍກວ່າ ຫຼື ເທົ່າກັບລາຄາຕົ້ນທຶນ");
      }

      // Check for duplicate name if name is being updated
      if (updateData.product_name) {
        const existingProduct = await Product.findOne({
          product_name: updateData.product_name,
          product_id: { $ne: id }
        });
        
        if (existingProduct) {
          throw new Error("ມີສິນຄ້ານີ້ຢູ່ແລ້ວ");
        }
      }

      const product = await Product.findOneAndUpdate(
        { product_id: id },
        updateData,
        { new: true }
      );

      if (!product) {
        throw new Error("ບໍ່ພົບສິນຄ້າ");
      }

      return product;
    } catch (error) {
      throw error;
    }
  },

  delete: async (productID) => {
    try {
      if (!productID || isNaN(parseInt(productID))) {
        throw new Error("ລະຫັດສິນຄ້າບໍ່ຖືກຕ້ອງ");
      }

      const id = parseInt(productID);
      const product = await Product.findOneAndDelete({ product_id: id });

      if (!product) {
        throw new Error("ບໍ່ພົບສິນຄ້າ");
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = productService;