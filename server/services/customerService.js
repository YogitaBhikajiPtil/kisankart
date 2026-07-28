const {
    User,
    Order,
    OrderItem,
    Product,
    Wishlist
} = require("../models");

// ==========================================
// Customer Dashboard Service
// ==========================================

const getDashboard = async (userId) => {


    const user = await User.findByPk(userId, {

        attributes: [
            "id",
            "name",
            "email",
            "role"
        ]

    });


    if (!user) {

        throw new Error("Customer not found.");

    }



    // Wishlist Count

    const wishlistCount = await Wishlist.count({

        where: {
            userId
        }

    });



    // Fetch Customer Orders

    const orders = await Order.findAll({

        where: {

            customerId: userId,
            

        },


        include: [

            {
                model: User,
                as: "farmer",
                attributes: ["name"]
            },


            {
                model: OrderItem,
                as: "items",

                include: [

                    {
                        model: Product,
                        as: "product",
                        attributes: ["name",
                            "marketPrice"
                        ]
                    }

                ]

            }

        ],


        order: [
            ["createdAt", "DESC"]
        ]

    });



    let totalSpent = 0;

    let savedMoney = 0;


orders.forEach(order => {

    // Total spent and money saved only for delivered orders

    if (order.orderStatus === "Delivered") {


        totalSpent += Number(order.totalAmount);


        order.items.forEach(item => {


            if (item.product && item.product.marketPrice) {


                savedMoney +=
                    (
                        Number(item.product.marketPrice)
                        -
                        Number(item.unitPrice)
                    )
                    *
                    Number(item.quantity);


            }


        });


    }


});




    const recentOrders = orders.slice(0, 5).map(order => ({


        id: order.orderNumber,


        product: order.items
            .map(item => item.product?.name)
            .join(", "),


        farmer: order.farmer?.name || "-",


        amount: Number(order.totalAmount),


        status: order.orderStatus


    }));




    return {


        user,


        summary: {


            totalOrders: orders.length,


            wishlistCount,


            totalSpent,


            savedMoney


        },


        orders: recentOrders


    };


};


module.exports = {

    getDashboard

};