const farmerOrderService = require("../services/farmerOrderService");

const getFarmerOrders = async(req,res,next)=>{

try{

const orders=

await farmerOrderService.getFarmerOrders(

req.user.id,


);

res.json({

success:true,

orders

});

}

catch(error){

next(error);

}

};

const getOrderDetails = async(req,res,next)=>{

try{

const order=

await farmerOrderService.getOrderDetails(

req.user.id,

req.params.id

);

res.json({

success:true,

order

});

}

catch(error){

next(error);

}

};

const updateOrderStatus = async (req, res, next) => {

    try {

        const order = await farmerOrderService.updateOrderStatus(

            req.user.id,

            req.params.id,

            req.body.status,

            req.body.remarks

        );

        res.json({

            success: true,

            message: "Order status updated successfully",

            order

        });

    }

    catch (error) {

        next(error);

    }

};

const getDashboard = async(req,res,next)=>{

try{

const dashboard=

await farmerOrderService.getDashboard(

req.user.id

);

res.json({

success:true,

dashboard

});

}

catch(error){

next(error);

}

};

module.exports={
    getDashboard,

getFarmerOrders,

getOrderDetails,

updateOrderStatus

};