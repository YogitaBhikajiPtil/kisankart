const {
    Wishlist,
    Product,
    ProductImage,
    Category,
    User
} = require("../models");

// ==========================================
// Get Wishlist
// ==========================================

const getWishlist = async (userId) => {

    const wishlist = await Wishlist.findAll({

        where: {
            userId
        },

        include: [

            {
                model: Product,
                as: "product",

                include: [

                    {
                        model: ProductImage,
                        as: "images"
                    },

                    {
                        model: Category,
                        as: "category"
                    },

                    {
                        model: User,
                        as: "farmer",
                        attributes: [
                            "id",
                            "name"
                        ]
                    }

                ]

            }

        ],

        order: [

            ["createdAt", "DESC"]

        ]

    });

    return wishlist;

};

// ==========================================
// Add To Wishlist
// ==========================================

const addToWishlist = async (

    userId,

    productId

) => {

    const product = await Product.findOne({

        where: {

            id: productId,

            status: "Available"

        }

    });

    if (!product) {

        throw new Error("Product not found");

    }

    const existing = await Wishlist.findOne({

        where: {

            userId,

            productId

        }

    });

    if (existing) {

        throw new Error(

            "Product already exists in wishlist"

        );

    }

    return await Wishlist.create({

        userId,

        productId

    });

};

// ==========================================
// Remove From Wishlist
// ==========================================

const removeFromWishlist = async (

    userId,

    wishlistId

) => {

    const item = await Wishlist.findOne({

        where: {

            id: wishlistId,

            userId

        }

    });

    if (!item) {

        throw new Error(

            "Wishlist item not found"

        );

    }

    await item.destroy();

};

module.exports = {

    getWishlist,

    addToWishlist,

    removeFromWishlist

};