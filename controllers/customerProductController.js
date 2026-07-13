const customerProductService = require("../services/customerProductService");


// ==========================================
// Get Products
// ==========================================

const getProducts = async (

    req,

    res,

    next

) => {

    try {


        const products = await customerProductService.getProducts(

            req.query

        );


        res.status(200).json({

            success:true,

            ...products

        });


    }

    catch(error){

        next(error);

    }

};




// ==========================================
// Get Product Details
// ==========================================

const getProductById = async (

    req,

    res,

    next

)=>{


    try{


        const product = await customerProductService.getProductById(

            req.params.id

        );


        res.status(200).json({

            success:true,

            product

        });


    }


    catch(error){

        next(error);

    }


};




// ==========================================
// Categories
// ==========================================

const getCategories = async (

    req,

    res,

    next

)=>{


    try{


        const categories = await customerProductService.getCategories();


        res.status(200).json({

            success:true,

            categories

        });


    }


    catch(error){

        next(error);

    }


};



module.exports = {


    getProducts,

    getProductById,

    getCategories


};
