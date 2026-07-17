const { Op } = require("sequelize");
const fs = require("fs");

const path = require("path");
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

const addProduct = async (
    productData,
    files,
    farmerId
) => {

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
        stock: totalQuantity,

        isOrganic,

        status,

        unit

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

    // Save Product Images

    if (files && files.length > 0) {

        const images = files.map((file, index) => ({

            productId: product.id,

            imageUrl: `/uploads/${file.filename}`,

            isPrimary: index === 0,

            displayOrder: index + 1

        }));

        await ProductImage.bulkCreate(images);

    }

    return await Product.findByPk(product.id, {

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

};
// ==========================================
// Get All Products
// ==========================================

// ==========================================
// Get All Products
// ==========================================

const getAllProducts = async (query) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const offset = (page - 1) * limit;

    const where = {};

    // Search

    if (query.keyword) {

        where.name = {

            [Op.like]: `%${query.keyword}%`

        };

    }

    // Category

    if (query.categoryId) {

        where.categoryId = query.categoryId;

    }

    // Status

    if (query.status) {

        where.status = query.status;

    }

    const { count, rows } = await Product.findAndCountAll({

        where,

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
            },

            {
                model: User,
                as: "farmer",
                attributes: [
                    "id",
                    "name"
                ]
            }

        ],

        order: [

            ["createdAt", "DESC"]

        ],

        limit,

        offset

    });

    return {

        totalProducts: count,

        currentPage: page,

        totalPages: Math.ceil(count / limit),

        products: rows

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

// ==========================================
// Update Product
// ==========================================

const updateProduct = async (

    productId,

    productData,

    files,

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

    await product.update({

        categoryId: productData.categoryId,

        name: productData.name,

        description: productData.description,

        price: productData.price,

        harvestDate: productData.harvestDate,

        expiryDate: productData.expiryDate,

        status: productData.status,

        isOrganic: productData.isOrganic

    });

    const inventory = await Inventory.findOne({

        where: {

            productId

        }

    });

    if (inventory) {

        await inventory.update({

            availableQuantity: productData.availableQuantity,

            totalQuantity: productData.availableQuantity,

            lowStockThreshold: productData.lowStockThreshold,

            unit: productData.unit

        });

    }

    if (files && files.length > 0) {

        const images = files.map((file, index) => ({

            productId,

            imageUrl: `/uploads/${file.filename}`,

            isPrimary: false,

            displayOrder: index + 1

        }));

        await ProductImage.bulkCreate(images);

    }

    return await Product.findByPk(productId, {

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

};

// ==========================================
// Delete Product Image
// ==========================================

const deleteProductImage = async (

    imageId,

    farmerId

) => {

    const image = await ProductImage.findByPk(imageId, {

        include: [

            {

                model: Product,

                as: "product"

            }

        ]

    });

    if (!image) {

        throw new Error("Image not found.");

    }

    if (image.product.farmerId !== farmerId) {

        throw new Error("Unauthorized.");

    }

    const imagePath = path.join(

        __dirname,

        "..",

        image.imageUrl

    );

    if (fs.existsSync(imagePath)) {

        fs.unlinkSync(imagePath);

    }

    await image.destroy();

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

    searchProducts,

    deleteProductImage,
};