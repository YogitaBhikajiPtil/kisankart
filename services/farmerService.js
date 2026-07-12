const {
    User,
    Product,
    Category,
    ProductImage,
    Inventory
} = require("../models");

// ==========================================
// Farmer Dashboard Service
// ==========================================

const getDashboard = async (farmerId) => {

    // Check Farmer

    const farmer = await User.findByPk(farmerId, {
        attributes: [
            "id",
            "name",
            "email"
        ]
    });

    if (!farmer) {

        throw new Error("Farmer not found.");

    }

    // Get Farmer Products

    const products = await Product.findAll({

        where: {
            farmerId
        },

        include: [

            {
                model: Category,
                as: "category"
            },

            {
                model: ProductImage,
                as: "images"
            },

            {
                model: Inventory,
                as: "inventory"
            }

        ],

        order: [
            ["createdAt", "DESC"]
        ]

    });

    // Dashboard Summary

    const totalProducts = products.length;

    let totalOrders = 0;
    let totalRevenue = 0;
    let lowStockProducts = 0;

    products.forEach(product => {

        if (
            product.inventory &&
            product.inventory.availableQuantity <=
            product.inventory.lowStockThreshold
        ) {

            lowStockProducts++;

        }

    });

    return {

        farmer,

        summary: {

            totalProducts,

            totalOrders,

            totalRevenue,

            lowStockProducts

        },

        products

    };

};

module.exports = {

    getDashboard

};