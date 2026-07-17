const cartService = require("../services/cartService");

// ==========================================
// Get Cart
// ==========================================

const getCart = async (req, res, next) => {

    try {

        const cart = await cartService.getCart(

            req.user.id

        );

        return res.status(200).json({

            success: true,

            cart

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Add To Cart
// ==========================================

const addToCart = async (req, res, next) => {

    try {

        const cart = await cartService.addToCart(

            req.user.id,

            req.body

        );

        return res.status(201).json({

            success: true,

            message: "Product added to cart",

            cart

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Update Quantity
// ==========================================

const updateCart = async (req, res, next) => {

    try {

        const cart = await cartService.updateCart(

            req.user.id,

            req.params.cartItemId,

            req.body.quantity

        );

        return res.status(200).json({

            success: true,

            message: "Cart updated",

            cart

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Remove Item
// ==========================================

const removeCartItem = async (req, res, next) => {

    try {

        await cartService.removeCartItem(

            req.user.id,

            req.params.cartItemId

        );

        return res.status(200).json({

            success: true,

            message: "Item removed from cart"

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Clear Cart
// ==========================================

const clearCart = async (req, res, next) => {

    try {

        await cartService.clearCart(

            req.user.id

        );

        return res.status(200).json({

            success: true,

            message: "Cart cleared"

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    getCart,

    addToCart,

    updateCart,

    removeCartItem,

    clearCart

};