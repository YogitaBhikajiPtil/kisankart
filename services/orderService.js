const { Op } = require("sequelize");

const {

    Order,

    OrderItem,

    OrderStatusHistory,

    Product,

    ProductImage,

    User,

    Address,

    Payment

} = require("../models");

// ==========================================
// Dashboard
// ==========================================

const getDashboard = async (farmerId) => {

    const pending = await Order.count({

        where: {

            farmerId,

            orderStatus: "Pending"

        }

    });

    const accepted = await Order.count({

        where: {

            farmerId,

            orderStatus: "Accepted"

        }

    });

    const packed = await Order.count({

        where: {

            farmerId,

            orderStatus: "Packed"

        }

    });

    const delivered = await Order.count({

        where: {

            farmerId,

            orderStatus: "Delivered"

        }

    });

    return {

        pending,

        accepted,

        packed,

        delivered

    };

};

// ==========================================
// Get Orders
// ==========================================

const getOrders = async (

    farmerId,

    query

) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const offset = (page - 1) * limit;

    const where = {

        farmerId

    };

    if (query.status) {

        where.orderStatus = query.status;

    }

    if (query.keyword) {

        where.orderNumber = {

            [Op.like]: `%${query.keyword}%`

        };

    }

    const { count, rows } = await Order.findAndCountAll({

        where,

        include: [

            {

                model: User,

                as: "customer",

                attributes: [

                    "id",

                    "name",

                    "email"

                ]

            }

        ],

        order: [

            [

                "createdAt",

                "DESC"

            ]

        ],

        limit,

        offset

    });

    return {

        orders: rows,

        totalOrders: count,

        totalPages: Math.ceil(count / limit),

        currentPage: page

    };

};

// ==========================================
// Get Single Order
// ==========================================

const getOrderById = async (

    orderId,

    farmerId

) => {

    const order = await Order.findOne({

        where: {

            id: orderId,

            farmerId

        },

        include: [

            {

                model: User,

                as: "customer"

            },

            {

                model: Address,

                as: "address"

            },

            {

                model: Payment,

                as: "payment"

            },

            {

                model: OrderItem,

                as: "items",

                include: [

                    {

                        model: Product,

                        as: "product",

                        include: [

                            {

                                model: ProductImage,

                                as: "images"

                            }

                        ]

                    }

                ]

            },

            {

                model: OrderStatusHistory,

                as: "statusHistory"

            }

        ]

    });

    if (!order) {

        throw new Error(

            "Order not found."

        );

    }

    return order;

};

// ==========================================
// Update Status
// ==========================================

const updateOrderStatus = async (

    orderId,

    farmerId,

    body

) => {

    const order = await Order.findOne({

        where: {

            id: orderId,

            farmerId

        }

    });

    if (!order) {

        throw new Error(

            "Order not found."

        );

    }

    order.orderStatus = body.status;

    await order.save();

    await OrderStatusHistory.create({

        orderId: order.id,

        status: body.status,

        remarks: body.remarks || "",

        updatedBy: farmerId

    });

    return order;

};

module.exports = {

    getDashboard,

    getOrders,

    getOrderById,

    updateOrderStatus

};