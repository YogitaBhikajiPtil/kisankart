const express = require("express");

const router = express.Router();

const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

// ==========================================
// Public Routes
// ==========================================

// Get All Categories
router.get(
    "/",
    getAllCategories
);

// ==========================================
// Admin Routes
// ==========================================

// Create Category
router.post(
    "/",
    authenticate,
    authorize("admin"),
    createCategory
);

// Update Category
router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateCategory
);

// Delete Category
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteCategory
);

module.exports = router;