const categoryService = require("../services/categoryService");

// ==========================================
// Get All Categories
// ==========================================

const getAllCategories = async (req, res, next) => {

    try {

        const categories = await categoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Create Category
// ==========================================

const createCategory = async (req, res, next) => {

    try {

        const category = await categoryService.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Update Category
// ==========================================

const updateCategory = async (req, res, next) => {

    try {

        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category
        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Delete Category
// ==========================================

const deleteCategory = async (req, res, next) => {

    try {

        await categoryService.deleteCategory(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully."
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};