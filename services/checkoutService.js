const {

    Cart,

    CartItem,

    Product,

    Order,

    OrderItem,

    Payment,

    Address,

    OrderStatusHistory

} = require("../models");

const { sequelize } = require("../config/database");


// ==========================================
// Generate Order Number
// ==========================================

const generateOrderNumber = () => {

    return "KK" + Date.now();

};


// ==========================================
// Create Order
// ==========================================

const createOrder = async (

    userId,

    data

) => {


    const transaction = await sequelize.transaction();


    try {


        const {

            addressId,

            paymentMethod

        } = data;



        // 1. Validate Address

        const address = await Address.findOne({

            where:{

                id: addressId,

                userId

            },

            transaction

        });


        if(!address){

            throw new Error(

                "Address not found"

            );

        }



        // 2. Get Cart


        const cart = await Cart.findOne({

            where:{

                userId

            },

            include:[

                {

                    model:CartItem,

                    as:"items",

                    include:[

                        {

                            model:Product,

                            as:"product"

                        }

                    ]

                }

            ],

            transaction

        });



        if(!cart || cart.items.length === 0){

            throw new Error(

                "Cart is empty"

            );

        }



        // 3. Group items by farmer


        const farmerOrders = {};


        cart.items.forEach(item=>{


            const farmerId = item.product.farmerId;


            if(!farmerOrders[farmerId]){

                farmerOrders[farmerId]=[];

            }


            farmerOrders[farmerId].push(item);


        });



        const createdOrders=[];



        // 4. Create separate order for each farmer


        for(const farmerId in farmerOrders){


            const items = farmerOrders[farmerId];


            let subtotal=0;


            items.forEach(item=>{


                subtotal +=

                Number(item.product.price)

                *

                item.quantity;


            });



            const deliveryCharge = 40;

            const tax = subtotal * 0.05;


            const totalAmount =

                subtotal +

                deliveryCharge +

                tax;



            const order = await Order.create({


                orderNumber:generateOrderNumber(),


                customerId:userId,


                farmerId,


                addressId,


                subtotal,


                deliveryCharge,


                tax,


                totalAmount,


                paymentMethod,


                paymentStatus:"Pending"



            },{

                transaction

            });



            // Create Order Items


            for(const item of items){


                await OrderItem.create({


                    orderId:order.id,


                    productId:item.productId,


                    quantity:item.quantity,


                    unitPrice:item.product.price,


                    totalPrice:

                    Number(item.product.price)

                    *

                    item.quantity


                },{

                    transaction

                });


const product = item.product;

product.stock -= item.quantity;

if (product.stock < 0) {
    throw new Error("Insufficient stock");
}

if (product.stock === 0) {
    product.status = "Out Of Stock";
}

await product.save({ transaction });

            }



            // Create Payment


            await Payment.create({


                orderId:order.id,


                paymentMethod,


                paymentStatus:"Pending"


            },{

                transaction

            });



            createdOrders.push(order);


        }


        await OrderStatusHistory.create(
    {
        orderId: order.id,
        status: "Pending",
        remarks: "Order placed successfully",
        updatedBy: userId
    },
    {
        transaction
    }
);


        // 5. Clear Cart


        await CartItem.destroy({

            where:{

                cartId:cart.id

            },

            transaction

        });



        await transaction.commit();


        return createdOrders;



    }

    catch(error){


        await transaction.rollback();


        throw error;


    }

};




module.exports={

    createOrder

};