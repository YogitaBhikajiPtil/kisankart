const productService = require("../services/productService");

// ==========================================
// Add Product
// ==========================================

const addProduct = async (req, res, next) => {

    try {

        const product = await productService.addProduct(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Product added successfully.",
            product
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Get All Products
// ==========================================

const getAllProducts = async (req, res, next) => {

    try {

        const products = await productService.getAllProducts(req.query);

        return res.status(200).json({
            success: true,
            ...products
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Get Product By ID
// ==========================================

const getProductById = async (req, res, next) => {

    try {

        const product = await productService.getProductById(req.params.id);

        return res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Update Product
// ==========================================

const updateProduct = async (req, res, next) => {

    try {

        const product = await productService.updateProduct(
            req.params.id,
            req.body,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Delete Product
// ==========================================

const deleteProduct = async (req, res, next) => {

    try {

        await productService.deleteProduct(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Search Products
// ==========================================

const searchProducts = async (req, res, next) => {

    try {

        const products = await productService.searchProducts(req.query);

        return res.status(200).json({
            success: true,
            ...products
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};