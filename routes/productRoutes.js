const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
} = require("../controllers/productController");


const {
    addProductValidation,
    updateProductValidation
} = require("../validations/productValidation");
// ==========================================
// Farmer Routes
// ==========================================

// Add Product
router.post(
    "/",
    authenticate,
    authorize("farmer"),
    addProduct
);

// Get All Products
router.get(
    "/",
    getAllProducts
);

// Search Products
router.get(
    "/search",
    searchProducts
);

// Get Product By Id
router.get(
    "/:id",
    getProductById
);

// Update Product
router.put(
    "/:id",
    authenticate,
    authorize("farmer"),
    updateProduct
);

// Delete Product
router.delete(
    "/:id",
    authenticate,
    authorize("farmer"),
    deleteProduct
);

router.post(
    "/",
    authenticate,
    authorize("farmer"),
    addProductValidation,
    addProduct
);

router.put(
    "/:id",
    authenticate,
    authorize("farmer"),
    updateProductValidation,
    updateProduct
);
module.exports = router;