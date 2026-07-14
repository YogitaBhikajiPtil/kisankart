const {

    Order,

    OrderItem,

    Product,

    ProductImage,

    User,

    Payment,

    OrderStatusHistory,

    Address

} = require("../models");



// ==========================================
// Get All Customer Orders
// ==========================================

const getCustomerOrders = async(userId)=>{


    const orders = await Order.findAll({

        where:{

            customerId:userId

        },


        include:[


            {

                model:OrderItem,

                as:"items",

                include:[

                    {

                        model:Product,

                        as:"product",

                        include:[

                            {

                                model:ProductImage,

                                as:"images"

                            }

                        ]

                    }

                ]

            },


            {

                model:Payment,

                as:"payment"

            },


            {

                model:OrderStatusHistory,

                as:"statusHistory"

            },


            {

                model:Address,

                as:"address"

            },


            {

                model:User,

                as:"farmer",

                attributes:[

                    "id",

                    "name"

                ]

            }


        ],


        order:[

            ["createdAt","DESC"]

        ]

    });



    return orders;


};




// ==========================================
// Get Single Order
// ==========================================

const getOrderDetails = async(


    userId,

    orderId


)=>{


    const order = await Order.findOne({

        where:{


            id:orderId,

            customerId:userId


        },


        include:[


            {


                model:OrderItem,

                as:"items",

                include:[

                    {

                        model:Product,

                        as:"product",

                        include:[

                            {

                                model:ProductImage,

                                as:"images"

                            }

                        ]

                    }

                ]


            },


            {

                model:Payment,

                as:"payment"

            },


            {

                model:OrderStatusHistory,

                as:"statusHistory"

            },


            {

                model:Address,

                as:"address"

            },


            {

                model:User,

                as:"farmer",

                attributes:[

                    "id",

                    "name"

                ]

            }


        ]

    });



    if(!order){

        throw new Error(

            "Order not found"

        );

    }



    return order;


};




module.exports={


    getCustomerOrders,

    getOrderDetails


};