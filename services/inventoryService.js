const { Op } = require("sequelize");

const {

    Inventory,

    Product,

    Category

} = require("../models");

// ==========================================
// Get Inventory
// ==========================================

const getInventory = async (

    farmerId,

    query

) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const offset = (page - 1) * limit;

    const productWhere = {

        farmerId

    };

    // Search

    if (query.keyword) {

        productWhere.name = {

            [Op.like]: `%${query.keyword}%`

        };

    }

    // Category Filter

    if (query.categoryId) {

        productWhere.categoryId = query.categoryId;

    }

    const { count, rows } = await Inventory.findAndCountAll({

        include: [

            {

                model: Product,

                as: "product",

                where: productWhere,

                include: [

                    {

                        model: Category,

                        as: "category"

                    }

                ]

            }

        ],

        order: [

            ["createdAt", "DESC"]

        ],

        limit,

        offset

    });

    // Summary

    const allInventory = await Inventory.findAll({

        include: [

            {

                model: Product,

                as: "product",

                where: {

                    farmerId

                }

            }

        ]

    });

    const summary = {

        totalProducts: allInventory.length,

        totalStock: 0,

        lowStock: 0,

        outOfStock: 0

    };

    allInventory.forEach(item => {

        summary.totalStock += item.availableQuantity;

        if (

            item.availableQuantity <=

            item.lowStockThreshold

        ) {

            summary.lowStock++;

        }

        if (item.availableQuantity === 0) {

            summary.outOfStock++;

        }

    });

    return {

        summary,

        inventory: rows,

        currentPage: page,

        totalPages: Math.ceil(count / limit),

        totalInventory: count

    };

};

// ==========================================
// Stock In
// ==========================================

const stockIn = async (

    inventoryId,

    farmerId,

    quantity

) => {

    quantity = Number(quantity);

    if (quantity <= 0) {

        throw new Error("Invalid quantity.");

    }

    const inventory = await Inventory.findOne({

        where: {

            id: inventoryId

        },

        include: [

            {

                model: Product,

                as: "product",

                where: {

                    farmerId

                }

            }

        ]

    });

    if (!inventory) {

        throw new Error("Inventory not found.");

    }

    inventory.availableQuantity += quantity;

    inventory.totalQuantity += quantity;

    await inventory.save();

    return inventory;

};

// ==========================================
// Stock Out
// ==========================================

const stockOut = async (

    inventoryId,

    farmerId,

    quantity

) => {

    quantity = Number(quantity);

    if (quantity <= 0) {

        throw new Error("Invalid quantity.");

    }

    const inventory = await Inventory.findOne({

        where: {

            id: inventoryId

        },

        include: [

            {

                model: Product,

                as: "product",

                where: {

                    farmerId

                }

            }

        ]

    });

    if (!inventory) {

        throw new Error("Inventory not found.");

    }

    if (

        quantity >

        inventory.availableQuantity

    ) {

        throw new Error(

            "Insufficient stock."

        );

    }

    inventory.availableQuantity -= quantity;

    await inventory.save();

    return inventory;

};

module.exports = {

    getInventory,

    stockIn,

    stockOut

};