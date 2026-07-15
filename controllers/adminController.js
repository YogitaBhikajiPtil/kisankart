const adminService = require("../services/adminService");



// ==========================================
// Dashboard
// ==========================================

const getDashboard = async(req,res,next)=>{

    try{

        const dashboard =

        await adminService.getDashboard();


        res.json({

            success:true,

            dashboard

        });

    }

    catch(error){

        next(error);

    }

};



// ==========================================
// Users
// ==========================================

const getUsers = async(req,res,next)=>{

    try{

        const users =

        await adminService.getUsers();


        res.json({

            success:true,

            users

        });

    }

    catch(error){

        next(error);

    }

};




// ==========================================
// Update Status
// ==========================================

const updateUserStatus = async(req,res,next)=>{

    try{


        const user =

        await adminService.updateUserStatus(

            req.params.id,

            req.body.isActive

        );


        res.json({

            success:true,

            user

        });


    }

    catch(error){

        next(error);

    }

};




// ==========================================
// Products
// ==========================================

const getProducts = async(req,res,next)=>{

    try{


        const products =

        await adminService.getProducts();


        res.json({

            success:true,

            products

        });


    }

    catch(error){

        next(error);

    }

};




// ==========================================
// Orders
// ==========================================

const getOrders = async(req,res,next)=>{

    try{


        const orders =

        await adminService.getOrders();


        res.json({

            success:true,

            orders

        });


    }

    catch(error){

        next(error);

    }

};

// ==========================================
// Hide / Unhide Product
// ==========================================

const updateProductStatus = async (req, res, next) => {

    try {

        const product = await adminService.updateProductStatus(

            req.params.id,

            req.body.status

        );

        res.json({

            success: true,

            product

        });

    }

    catch (error) {

        next(error);

    }

};


// ==========================================
// Delete Product
// ==========================================

const deleteProduct = async (req, res, next) => {

    try {

        await adminService.deleteProduct(

            req.params.id

        );

        res.json({

            success: true,

            message: "Product deleted"

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports={

    getDashboard,

    getUsers,

    updateUserStatus,

    getProducts,

    getOrders,
    updateProductStatus,
deleteProduct

};