const express = require("express");

const router = express.Router();

const {

    getWishlist,

    addToWishlist,

    removeFromWishlist

} = require("../controllers/wishlistController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

// Get Wishlist

router.get(

    "/",

    authenticate,

    authorize("customer"),

    getWishlist

);

// Add Product

router.post(

    "/",

    authenticate,

    authorize("customer"),

    addToWishlist

);

// Remove Product

router.delete(

    "/:wishlistId",

    authenticate,

    authorize("customer"),

    removeFromWishlist

);

module.exports = router;