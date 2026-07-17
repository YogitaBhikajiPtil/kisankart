const profileService = require("../services/profileService");


// ==========================================
// Get Profile
// ==========================================

const getProfile = async (

    req,

    res,

    next

) => {

    try {

        const profile = await profileService.getProfile(

            req.user.id

        );


        res.status(200).json({

            success:true,

            profile

        });

    }

    catch(error){

        next(error);

    }

};



// ==========================================
// Update Profile
// ==========================================

const updateProfile = async (

    req,

    res,

    next

) => {

    try {

        const profile = await profileService.updateProfile(

            req.user.id,

            req.body

        );


        res.status(200).json({

            success:true,

            message:"Profile updated successfully",

            profile

        });

    }

    catch(error){

        next(error);

    }

};


module.exports = {

    getProfile,

    updateProfile

};