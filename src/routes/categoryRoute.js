const express = require('express');
const router = express.Router();

const {getAllCategories, getCategoryById, createCategory} = require('../controllers/categoryController');

// get all categories
router.get('/', getAllCategories);

// get a category by id
router.get('/:category_id', getCategoryById);

// create a new category
router.post('/', createCategory);

module.exports = router;