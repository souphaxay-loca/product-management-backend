const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Remove '/products' from all routes since we already have /api/products in app.js
// get all products
router.get('/', getAllProducts);

// get a product by id  
router.get('/:product_id', getProductById);

// create a new product
router.post('/', createProduct);

// update a product
router.put('/:product_id', updateProduct);

// delete a product
router.delete('/:product_id', deleteProduct);

module.exports = router;