const Product = require('../models/product');

const productService = {
    findAll: async () => {
        return await Product.find()
            .populate("category_id", "category_name")
            .populate("unit_id", "unit_name");
    },
    findById: async (productID) => {
        // Convert string to number
        const id = parseInt(productID);
        return await Product.findOne({ product_id: id })
            .populate("category_id", "category_name")
            .populate("unit_id", "unit_name");
    },
    create: async (productData) => {
        const product = new Product(productData);
        await product.save();
        return product;
    },
    update: async (productID, updateData) => {
        // Convert string to number
        const id = parseInt(productID);
        return await Product.findOneAndUpdate(
            { product_id: id },
            updateData,
            {
                new: true,
            }
        );
    },
    delete: async (productID) => {
        // Convert string to number
        const id = parseInt(productID);
        return await Product.findOneAndDelete({ product_id: id });
    },
};

module.exports = productService;