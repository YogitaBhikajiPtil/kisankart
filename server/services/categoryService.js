const { Category } = require("../models");

// ==========================================
// Get All Categories
// ==========================================

const getAllCategories = async () => {

    const categories = await Category.findAll({

        where: {
            isActive: true
        },

        order: [
            ["name", "ASC"]
        ]

    });

    return categories;

};

// ==========================================
// Create Category
// ==========================================

const createCategory = async (categoryData) => {

    const {
        name,
        description,
        image
    } = categoryData;

    const existingCategory = await Category.findOne({

        where: {
            name
        }

    });

    if (existingCategory) {

        throw new Error("Category already exists.");

    }

    const category = await Category.create({

        name,

        description,

        image

    });

    return category;

};

// ==========================================
// Update Category
// ==========================================

const updateCategory = async (
    categoryId,
    categoryData
) => {

    const category = await Category.findByPk(categoryId);

    if (!category) {

        throw new Error("Category not found.");

    }

    await category.update(categoryData);

    return category;

};

// ==========================================
// Delete Category
// ==========================================

const deleteCategory = async (categoryId) => {

    const category = await Category.findByPk(categoryId);

    if (!category) {

        throw new Error("Category not found.");

    }

    await category.destroy();

};

module.exports = {

    getAllCategories,

    createCategory,

    updateCategory,

    deleteCategory

};