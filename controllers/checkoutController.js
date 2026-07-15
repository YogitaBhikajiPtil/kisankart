const checkoutService = require("../services/checkoutService");


// ==========================================
// Create Order
// ==========================================

const createOrder = async (req, res, next) => {

    try {


        const order = await checkoutService.createOrder(

            req.user.id,

            req.body

        );


        res.status(201).json({

            success:true,

            message:"Order placed successfully",

            orders: order

        });


    }

    catch(error){

        next(error);

    }

};


module.exports = {

    createOrder

};