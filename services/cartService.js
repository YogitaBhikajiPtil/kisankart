const {
    Cart,
    CartItem,
    Product,
    ProductImage
} = require("../models");

// ==========================================
// Get or Create Cart
// ==========================================

const getOrCreateCart = async (userId) => {

    let cart = await Cart.findOne({
        where: {
            userId
        }
    });

    if (!cart) {

        cart = await Cart.create({
            userId
        });

    }

    return cart;

};

// ==========================================
// Get Cart
// ==========================================

const getCart = async (userId) => {

    const cart = await getOrCreateCart(userId);

    const cartData = await Cart.findOne({

        where: {
            id: cart.id
        },

        include: [

            {

                model: CartItem,

                as: "items",

                include: [

                    {

                        model: Product,

                        as: "product",

                        include: [

                            {

                                model: ProductImage,

                                as: "images"

                            }

                        ]

                    }

                ]

            }

        ]

    });

    let total = 0;

    cartData.items.forEach(item => {

        total += item.quantity * item.product.price;

    });

    return {

        items: cartData.items,

        total

    };

};

// ==========================================
// Add To Cart
// ==========================================

const addToCart = async (userId, data) => {

    const cart = await getOrCreateCart(userId);

    const product = await Product.findByPk(data.productId);

    if (!product) {

        throw new Error("Product not found");

    }

    let item = await CartItem.findOne({

        where: {

            cartId: cart.id,

            productId: data.productId

        }

    });

    if (item) {

        item.quantity += Number(data.quantity);

        await item.save();

    } else {

        item = await CartItem.create({

            cartId: cart.id,

            productId: data.productId,

            quantity: Number(data.quantity)

        });

    }

    return item;

};

// ==========================================
// Update Quantity
// ==========================================

const updateCart = async (

    userId,

    cartItemId,

    quantity

) => {

    const cart = await getOrCreateCart(userId);

    const item = await CartItem.findOne({

        where: {

            id: cartItemId,

            cartId: cart.id

        }

    });

    if (!item) {

        throw new Error("Cart item not found");

    }

    item.quantity = Number(quantity);

    await item.save();

    return item;

};

// ==========================================
// Remove Item
// ==========================================

const removeCartItem = async (

    userId,

    cartItemId

) => {

    const cart = await getOrCreateCart(userId);

    const item = await CartItem.findOne({

        where: {

            id: cartItemId,

            cartId: cart.id

        }

    });

    if (!item) {

        throw new Error("Cart item not found");

    }

    await item.destroy();

};

// ==========================================
// Clear Cart
// ==========================================

const clearCart = async (userId) => {

    const cart = await getOrCreateCart(userId);

    await CartItem.destroy({

        where: {

            cartId: cart.id

        }

    });

};

module.exports = {

    getCart,

    addToCart,

    updateCart,

    removeCartItem,

    clearCart

};