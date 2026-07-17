const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

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
    searchProducts,
    deleteProductImage,
} = require("../controllers/productController");

const {
    addProductValidation,
    updateProductValidation
} = require("../validations/productValidation");

// ==========================================
// Add Product
// ==========================================

router.post(
    "/",
    authenticate,
    authorize("farmer"),
    upload.array("images", 5),
    addProductValidation,
    addProduct
);

// ==========================================
// Get All Products
// ==========================================

router.get(
    "/",
    getAllProducts
);

// ==========================================
// Search Products
// ==========================================

router.get(
    "/search",
    searchProducts
);

// ==========================================
// Get Product By Id
// ==========================================

router.get(
    "/:id",
    getProductById
);

// ==========================================
// Update Product
// ==========================================

router.put(
    "/:id",
    authenticate,
    authorize("farmer"),
     upload.array("images", 5),
    updateProductValidation,
    updateProduct
);

// ==========================================
// Delete Product
// ==========================================

router.delete(
    "/:id",
    authenticate,
    authorize("farmer"),
    deleteProduct
);

// ==========================================
// Delete Product Image
// ==========================================

router.delete(

    "/images/:imageId",

    authenticate,

    authorize("farmer"),

    deleteProductImage

);

module.exports = router;