const {

    Product,

    Category,

    User,

    ProductImage,

    Review

} = require("../models");


const {

    Op

} = require("sequelize");



// ==========================================
// Get Products
// ==========================================

const getProducts = async (query)=>{


    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 12;

    const offset = (page - 1) * limit;



    let where = {};




    // Search

    if(query.search){


        where.name = {

            [Op.like]: `%${query.search}%`

        };


    }




    // Category Filter

    if(query.category){


        where.categoryId = query.category;


    }




    // Price Filter

    if(query.minPrice || query.maxPrice){


        where.price = {};


        if(query.minPrice){

            where.price[Op.gte] = Number(query.minPrice);

        }


        if(query.maxPrice){

            where.price[Op.lte] = Number(query.maxPrice);

        }


    }




    let order = [

        [

            "createdAt",

            "DESC"

        ]

    ];



    // Sorting

    if(query.sort === "low"){


        order = [

            [

                "price",

                "ASC"

            ]

        ];

    }



    if(query.sort === "high"){


        order = [

            [

                "price",

                "DESC"

            ]

        ];

    }




    const {count,rows} = await Product.findAndCountAll({


        where,


        include:[


            {

                model:Category,

                as:"category"

            },


            {

                model:User,

                as:"farmer",

                attributes:[

                    "id",

                    "name"

                ]

            },


            {

                model:ProductImage,

                as:"images"

            },


            {

                model:Review,

                as:"reviews"

            }


        ],



        order,


        limit,


        offset



    });




    return {


        products:rows,


        totalProducts:count,


        totalPages:Math.ceil(count/limit),


        currentPage:page


    };


};






// ==========================================
// Product Details
// ==========================================

const getProductById = async(id)=>{


    const product = await Product.findOne({


        where:{


            id


        },



        include:[


            {

                model:Category,

                as:"category"

            },


            {

                model:User,

                as:"farmer",

                attributes:[

                    "id",

                    "name",

                    "phone"

                ]

            },


            {

                model:ProductImage,

                as:"images"

            },


            {

                model:Review,

                as:"reviews"

            }



        ]



    });



    if(!product){


        throw new Error(

            "Product not found"

        );


    }



    return product;


};







// ==========================================
// Categories
// ==========================================

const getCategories = async()=>{


    return await Category.findAll({


        order:[

            [

                "name",

                "ASC"

            ]

        ]

    });


};





module.exports = {


    getProducts,

    getProductById,

    getCategories


};