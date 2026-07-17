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
// Get Farmer Orders
// ==========================================

const getFarmerOrders = async (farmerId) => {

    return await Order.findAll({

        where: {
            farmerId
        },

        include: [

            {
                model: User,
                as: "customer",
                attributes: ["id", "name", "email", "phone"]
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

        ],

        order: [["createdAt", "DESC"]]

    });

};

// ==========================================
// Get Order Details
// ==========================================

const getOrderDetails = async (farmerId, orderId) => {

    const order = await Order.findOne({

        where: {

            id: orderId,

            farmerId

        },

        include: [

            {
                model: User,
                as: "customer",
                attributes: ["id", "name", "email", "phone"]
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

        throw new Error("Order not found");

    }

    return order;

};

// ==========================================
// Update Status
// ==========================================

const updateOrderStatus = async (

    farmerId,

    orderId,

    status,
    remarks

) => {

    console.log("Status received:", status);

    const allowed = [

        "Accepted",

        "Rejected",

        "Packed",

        "Ready For Pickup",

        "Out For Delivery",

        "Delivered",

        "Cancelled"

    ];

    if (!allowed.includes(status)) {

        throw new Error("Invalid order status");

    }

    const order = await Order.findOne({

        where: {

            id: orderId,

            farmerId

        }

    });

    if (!order) {

        throw new Error("Order not found");

    }

    order.orderStatus = status;

    if (status === "Delivered") {

        order.paymentStatus = "Paid";

        order.deliveredAt = new Date();

    }

    await order.save();

    await OrderStatusHistory.create({

        orderId: order.id,

        status,

        remarks: 
        remarks || `Order ${status}`,

        updatedBy: farmerId

    });

    return order;

};

const getDashboard = async(farmerId)=>{

const orders=

await Order.findAll({

where:{
farmerId
}

});

return{

pending:
orders.filter(
o=>o.orderStatus==="Pending"
).length,

accepted:
orders.filter(
o=>o.orderStatus==="Accepted"
).length,

packed:
orders.filter(
o=>o.orderStatus==="Packed"
).length,

delivered:
orders.filter(
o=>o.orderStatus==="Delivered"
).length

};

};

module.exports = {
    getDashboard,

    getFarmerOrders,

    getOrderDetails,

    updateOrderStatus

};