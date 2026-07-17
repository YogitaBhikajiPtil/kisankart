const orderService = require("../services/customerOrderService");


// ==========================================
// Get Customer Orders
// ==========================================

const getCustomerOrders = async(req,res,next)=>{

    try{

        const orders = await orderService.getCustomerOrders(
            req.user.id
        );


        res.status(200).json({

            success:true,

            orders

        });


    }
    catch(error){

        next(error);

    }

};



// ==========================================
// Get Order Details
// ==========================================

const getOrderDetails = async(req,res,next)=>{

    try{


        const order = await orderService.getOrderDetails(

            req.user.id,

            req.params.id

        );


        res.status(200).json({

            success:true,

            order

        });


    }
    catch(error){

        next(error);

    }

};



module.exports = {

    getCustomerOrders,

    getOrderDetails

};