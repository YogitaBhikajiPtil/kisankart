const {

    User

} = require("../models");


// ==========================================
// Get Farmer Profile
// ==========================================

const getProfile = async (userId) => {


    const user = await User.findOne({

        where: {

            id:userId

        },

        attributes:[

            "id",

            "name",

            "email",

            "phone",

            "role",

            "profileImage",

            "createdAt"

        ]

    });


    if(!user){

        throw new Error(

            "Profile not found"

        );

    }


    return user;

};



// ==========================================
// Update Farmer Profile
// ==========================================

const updateProfile = async (

    userId,

    data

)=>{


    const user = await User.findByPk(

        userId

    );


    if(!user){

        throw new Error(

            "User not found"

        );

    }


    await user.update({

        name:data.name || user.name,

        phone:data.phone || user.phone,

        profileImage:data.profileImage || user.profileImage

    });


    return user;

};



module.exports = {

    getProfile,

    updateProfile

};