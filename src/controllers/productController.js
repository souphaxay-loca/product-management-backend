const productService = require("../services/productService");

const productController = {
  // get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.findAll();
      console.log("controller >> ", products);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // get a product by id
  getProductById: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const product = await productService.findById(productID);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const productData = req.body;

      // Basic validation
      if (!productData.product_name || !productData.price) {
        return res.status(400).json({
          message: "Product name and price are required",
        });
      }

      const product = await productService.create(productData);
      res.status(201).json(product);
    } catch (error) {
      // More specific error handling
      if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },

  // update a product
  updateProduct: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const updateData = req.body;

      const product = await productService.update(productID, updateData);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // delete a product
  deleteProduct: async (req, res) => {
    try {
      const productID = req.params.product_id;
      const product = await productService.delete(productID);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
