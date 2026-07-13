const {

    Order,

    OrderItem,

    Product

} = require("../models");

const { fn, col, literal } = require("sequelize");

// ==========================================
// Farmer Analytics
// ==========================================

const getAnalytics = async (farmerId) => {

    // =========================
    // Total Orders
    // =========================

    const totalOrders = await Order.count({

        where: {

            farmerId,

            orderStatus: "Delivered"

        }

    });

    // =========================
    // Total Revenue
    // =========================

    const totalRevenue = await Order.sum(

        "totalAmount",

        {

            where: {

                farmerId,

                orderStatus: "Delivered"

            }

        }

    ) || 0;

    // =========================
    // Today's Revenue
    // =========================

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todayRevenue = await Order.sum(

        "totalAmount",

        {

            where: {

                farmerId,

                orderStatus: "Delivered",

                createdAt: {

                    [require("sequelize").Op.gte]: today

                }

            }

        }

    ) || 0;

    // =========================
    // Monthly Revenue
    // =========================

    const monthStart = new Date(

        today.getFullYear(),

        today.getMonth(),

        1

    );

    const monthlyRevenue = await Order.sum(

        "totalAmount",

        {

            where: {

                farmerId,

                orderStatus: "Delivered",

                createdAt: {

                    [require("sequelize").Op.gte]: monthStart

                }

            }

        }

    ) || 0;

    // =========================
    // Top Selling Products
    // =========================

    const topProducts = await OrderItem.findAll({

        attributes: [

            "productId",

            [

                fn(

                    "SUM",

                    col("quantity")

                ),

                "soldQuantity"

            ]

        ],

        include: [

            {

                model: Product,

                as: "product",

                where: {

                    farmerId

                },

                attributes: [

                    "id",

                    "name",

                    "price"

                ]

            }

        ],

        group: [

            "productId",

            "product.id"

        ],

        order: [

            [

                literal("soldQuantity"),

                "DESC"

            ]

        ],

        limit: 5

    });

    // =========================
    // Recent Orders
    // =========================

    const recentOrders = await Order.findAll({

        where: {

            farmerId

        },

        order: [

            [

                "createdAt",

                "DESC"

            ]

        ],

        limit: 10

    });

    return {

        totalOrders,

        totalRevenue,

        todayRevenue,

        monthlyRevenue,

        topProducts,

        recentOrders

    };

};

module.exports = {

    getAnalytics

};