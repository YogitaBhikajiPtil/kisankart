
const { Op } = require("sequelize");
const {
    User,
    Product,
    Category,
    ProductImage,
    Inventory,
    Order
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

    

let totalOrders = 0;
let totalRevenue = 0;


const orders = await Order.findAll({

    where:{
        farmerId
    }

});

console.log("Farmer ID:", farmerId);
console.log("Orders Found:", orders.length);
console.log(
    orders.map(order => ({
        id: order.id,
        farmerId: order.farmerId,
        totalAmount: order.totalAmount
    }))
);

totalOrders = orders.length;


totalRevenue = orders.reduce(
    (sum, order)=>{

        return sum + Number(order.totalAmount);

    },
    0
);
    // Dashboard Summary

    const totalProducts = products.length;

    
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

// ==========================================
// Get My Products
// ==========================================

const getMyProducts = async (
    farmerId,
    query
) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const offset = (page - 1) * limit;

    const where = {

        farmerId

    };

    // Search

    if (query.keyword) {

        where.name = {

            [Op.like]: `%${query.keyword}%`

        };

    }

    // Category Filter

    if (query.categoryId) {

        where.categoryId = query.categoryId;

    }

    // Status Filter

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

module.exports = {

    getDashboard,

    getMyProducts

};