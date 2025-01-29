const express = require('express');
const router = express.Router();

const {getAllCategories, getCategoryById, createCategory, deleteCategory} = require('../controllers/categoryController');

// get all categories
router.get('/', getAllCategories);

// get a category by id
router.get('/:category_id', getCategoryById);

// create a new category
router.post('/', createCategory);

// delete a category
router.delete('/:category_id', deleteCategory);

module.exports = router;