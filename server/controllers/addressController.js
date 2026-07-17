const addressService = require("../services/addressService");


// ==========================================
// Create Address
// ==========================================

const createAddress = async (req, res, next) => {

    try {


        const address = await addressService.createAddress(

            req.user.id,

            req.body

        );


        res.status(201).json({

            success:true,

            message:"Address added successfully",

            address

        });


    }

    catch(error){

        next(error);

    }

};



// ==========================================
// Get Addresses
// ==========================================

const getAddresses = async (req,res,next)=>{

    try{


        const addresses = await addressService.getAddresses(

            req.user.id

        );


        res.status(200).json({

            success:true,

            addresses

        });


    }

    catch(error){

        next(error);

    }

};



// ==========================================
// Update Address
// ==========================================

const updateAddress = async(req,res,next)=>{


    try{


        const address = await addressService.updateAddress(

            req.user.id,

            req.params.id,

            req.body

        );


        res.status(200).json({

            success:true,

            message:"Address updated successfully",

            address

        });


    }

    catch(error){

        next(error);

    }


};



// ==========================================
// Delete Address
// ==========================================

const deleteAddress = async(req,res,next)=>{


    try{


        await addressService.deleteAddress(

            req.user.id,

            req.params.id

        );


        res.status(200).json({

            success:true,

            message:"Address deleted successfully"

        });


    }

    catch(error){

        next(error);

    }


};



module.exports = {

    createAddress,

    getAddresses,

    updateAddress,

    deleteAddress

};