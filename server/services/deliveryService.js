const {
    Order,
    OrderItem,
    Product,
    ProductImage,
    User,
    Address,
    Payment,
    OrderStatusHistory
} = require("../models");

// ==========================================
// Available Orders
// ==========================================

const getAvailableOrders = async () => {

    const orders = await Order.findAll({

        where: {

            orderStatus: "Ready For Pickup",

            deliveryPartnerId: null

        },

        include: [

            {
                model: User,
                as: "customer",
                attributes: ["id", "name", "phone"]
            },

            {
                model: Address,
                as: "address"
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
            }

        ],

        order: [["createdAt", "DESC"]]

    });

    return orders;

};

// ==========================================
// Accept Delivery
// ==========================================

const acceptDelivery = async (

    orderId,

    deliveryPartnerId

) => {

    const order = await Order.findByPk(orderId);

    if (!order) {

        throw new Error("Order not found");

    }

    if (order.deliveryPartnerId) {

        throw new Error("Order already accepted.");

    }

    order.deliveryPartnerId = deliveryPartnerId;

    order.orderStatus = "Out For Delivery";

    await order.save();

    await OrderStatusHistory.create({

        orderId: order.id,

        status: "Out For Delivery",

        remarks: "Accepted by delivery partner",

        updatedBy: deliveryPartnerId

    });

    return order;

};

// ==========================================
// My Deliveries
// ==========================================

const getMyDeliveries = async (

    deliveryPartnerId

) => {

    return await Order.findAll({

        where: {

            deliveryPartnerId

        },

        include: [

            {
                model: User,
                as: "customer",
                attributes: ["id", "name", "phone"]
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
            }

        ],

        order: [["createdAt", "DESC"]]

    });

};

// ==========================================
// Mark Delivered
// ==========================================

const markDelivered = async (

    orderId,

    deliveryPartnerId

) => {

    const order = await Order.findOne({

        where: {

            id: orderId,

            deliveryPartnerId

        }

    });

    if (!order) {

        throw new Error("Order not found.");

    }

    order.orderStatus = "Delivered";

    order.deliveredAt = new Date();

    await order.save();

    await Payment.update(

        {

            paymentStatus: "Paid"

        },

        {

            where: {

                orderId

            }

        }

    );

    await OrderStatusHistory.create({

        orderId,

        status: "Delivered",

        remarks: "Delivered Successfully",

        updatedBy: deliveryPartnerId

    });

    return order;

};

module.exports = {

    getAvailableOrders,

    acceptDelivery,

    getMyDeliveries,

    markDelivered

};