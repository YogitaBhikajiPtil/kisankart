const {

    Address

} = require("../models");


// ==========================================
// Create Address
// ==========================================

const createAddress = async (

    userId,

    data

) => {


    // If new address is default,
    // remove previous default

    if(data.isDefault){


        await Address.update(

            {
                isDefault:false
            },

            {

                where:{

                    userId

                }

            }

        );


    }


    const address = await Address.create({

        userId,

        fullName:data.fullName,

        mobile:data.mobile,

        addressLine1:data.addressLine1,

        addressLine2:data.addressLine2,

        city:data.city,

        state:data.state,

        pincode:data.pincode,

        landmark:data.landmark,

        addressType:data.addressType,

        isDefault:data.isDefault || false

    });


    return address;


};



// ==========================================
// Get Addresses
// ==========================================

const getAddresses = async(userId)=>{


    const addresses = await Address.findAll({

        where:{

            userId

        },

        order:[

            ["isDefault","DESC"],

            ["createdAt","DESC"]

        ]

    });


    return addresses;


};



// ==========================================
// Update Address
// ==========================================

const updateAddress = async(

    userId,

    addressId,

    data

)=>{


    const address = await Address.findOne({

        where:{

            id:addressId,

            userId

        }

    });



    if(!address){

        throw new Error(

            "Address not found"

        );

    }



    if(data.isDefault){


        await Address.update(

            {

                isDefault:false

            },

            {

                where:{

                    userId

                }

            }

        );


    }



    await address.update(data);


    return address;


};



// ==========================================
// Delete Address
// ==========================================

const deleteAddress = async(

    userId,

    addressId

)=>{


    const address = await Address.findOne({

        where:{

            id:addressId,

            userId

        }

    });



    if(!address){

        throw new Error(

            "Address not found"

        );

    }



    await address.destroy();


};



module.exports = {


    createAddress,

    getAddresses,

    updateAddress,

    deleteAddress


};