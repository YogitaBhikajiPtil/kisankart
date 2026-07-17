const express = require("express");

const router = express.Router();

const {

    getCart,

    addToCart,

    updateCart,

    removeCartItem,

    clearCart

} = require("../controllers/cartController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

// Get Cart

router.get(

    "/",

    authenticate,

    authorize("customer"),

    getCart

);

// Add Item

router.post(

    "/",

    authenticate,

    authorize("customer"),

    addToCart

);

// Update Quantity

router.put(

    "/:cartItemId",

    authenticate,

    authorize("customer"),

    updateCart

);

// Remove Item

router.delete(

    "/:cartItemId",

    authenticate,

    authorize("customer"),

    removeCartItem

);

// Clear Cart

router.delete(

    "/",

    authenticate,

    authorize("customer"),

    clearCart

);

module.exports = router;