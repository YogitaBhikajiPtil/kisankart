const { Op } = require("sequelize");

const {
    Product,
    Category,
    ProductImage,
    Inventory,
    User
} = require("../models");

// ==========================================
// Add Product
// ==========================================

const addProduct = async (productData, farmerId) => {

    const {
        categoryId,
        name,
        description,
        price,
        harvestDate,
        expiryDate,
        isOrganic,
        status,
        totalQuantity,
        unit,
        lowStockThreshold
    } = productData;

    // Check Category

    const category = await Category.findByPk(categoryId);

    if (!category) {
        throw new Error("Category not found.");
    }

    // Create Product

    const product = await Product.create({

        farmerId,

        categoryId,

        name,

        description,

        price,

        harvestDate,

        expiryDate,

        isOrganic,

        status

    });

    // Create Inventory

    await Inventory.create({

        productId: product.id,

        totalQuantity,

        availableQuantity: totalQuantity,

        reservedQuantity: 0,

        lowStockThreshold,

        unit

    });

    return product;

};

// ==========================================
// Get All Products
// ==========================================

const getAllProducts = async () => {

    const products = await Product.findAll({

        include: [

            {
                model: Category,
                as: "category"
            },

            {
                model: User,
                as: "farmer",
                attributes: [
                    "id",
                    "name"
                ]
            },

            {
                model: Inventory,
                as: "inventory"
            },

            {
                model: ProductImage,
                as: "images"
            }

        ],

        order: [
            ["createdAt", "DESC"]
        ]

    });

    return {

        totalProducts: products.length,

        products

    };

};

// ==========================================
// Get Product By ID
// ==========================================

const getProductById = async (id) => {

    const product = await Product.findByPk(id, {

        include: [

            {
                model: Category,
                as: "category"
            },

            {
                model: User,
                as: "farmer",
                attributes: [
                    "id",
                    "name"
                ]
            },

            {
                model: Inventory,
                as: "inventory"
            },

            {
                model: ProductImage,
                as: "images"
            }

        ]

    });

    if (!product) {

        throw new Error("Product not found.");

    }

    return product;

};

// ==========================================
// Update Product
// ==========================================

const updateProduct = async (
    productId,
    productData,
    farmerId
) => {

    const product = await Product.findOne({

        where: {

            id: productId,

            farmerId

        }

    });

    if (!product) {

        throw new Error("Product not found.");

    }

    await product.update(productData);

    return product;

};

// ==========================================
// Delete Product
// ==========================================

const deleteProduct = async (
    productId,
    farmerId
) => {

    const product = await Product.findOne({

        where: {

            id: productId,

            farmerId

        }

    });

    if (!product) {

        throw new Error("Product not found.");

    }

    await product.destroy();

};

// ==========================================
// Search Products
// ==========================================

const searchProducts = async (query) => {

    const keyword = query.keyword || "";

    const products = await Product.findAll({

        where: {

            name: {

                [Op.like]: `%${keyword}%`

            }

        },

        include: [

            {
                model: Category,
                as: "category"
            },

            {
                model: Inventory,
                as: "inventory"
            },

            {
                model: ProductImage,
                as: "images"
            }

        ]

    });

    return {

        totalProducts: products.length,

        products

    };

};

module.exports = {

    addProduct,

    getAllProducts,

    getProductById,

    updateProduct,

    deleteProduct,

    searchProducts

};