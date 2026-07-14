const wishlistService = require("../services/wishlistService");

// ==========================================
// Get Wishlist
// ==========================================

const getWishlist = async (req, res, next) => {

    try {

        const wishlist = await wishlistService.getWishlist(

            req.user.id

        );

        res.status(200).json({

            success: true,

            wishlist

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Add To Wishlist
// ==========================================

const addToWishlist = async (req, res, next) => {

    try {

        const item = await wishlistService.addToWishlist(

            req.user.id,

            req.body.productId

        );

        res.status(201).json({

            success: true,

            message: "Product added to wishlist",

            item

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Remove From Wishlist
// ==========================================

const removeFromWishlist = async (req, res, next) => {

    try {

        await wishlistService.removeFromWishlist(

            req.user.id,

            req.params.wishlistId

        );

        res.status(200).json({

            success: true,

            message: "Product removed from wishlist"

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getWishlist,

    addToWishlist,

    removeFromWishlist

};