const {

    Cart,

    CartItem,

    Product,

    ProductImage

} = require("../models");

// ==========================================
// Get Or Create Cart
// ==========================================

const getOrCreateCart = async (customerId) => {

    let cart = await Cart.findOne({

        where: {

            customerId

        }

    });

    if (!cart) {

        cart = await Cart.create({

            customerId

        });

    }

    return cart;

};

// ==========================================
// Get Cart
// ==========================================

const getCart = async (customerId) => {

    const cart = await getOrCreateCart(customerId);

    const items = await CartItem.findAll({

        where: {

            cartId: cart.id

        },

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

    });

    let total = 0;

    items.forEach(item => {

        total += item.quantity * item.product.price;

    });

    return {

        id: cart.id,

        items,

        total

    };

};

// ==========================================
// Add To Cart
// ==========================================

const addToCart = async (customerId, data) => {

    const cart = await getOrCreateCart(customerId);

    const product = await Product.findByPk(data.productId);

    if (!product) {

        throw new Error("Product not found");

    }

    let cartItem = await CartItem.findOne({

        where: {

            cartId: cart.id,

            productId: data.productId

        }

    });

    if (cartItem) {

        cartItem.quantity += Number(data.quantity);

        await cartItem.save();

    } else {

        cartItem = await CartItem.create({

            cartId: cart.id,

            productId: data.productId,

            quantity: Number(data.quantity)

        });

    }

    return cartItem;

};

// ==========================================
// Update Cart
// ==========================================

const updateCart = async (

    customerId,

    cartItemId,

    quantity

) => {

    await getOrCreateCart(customerId);

    const item = await CartItem.findByPk(cartItemId);

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

    customerId,

    cartItemId

) => {

    await getOrCreateCart(customerId);

    const item = await CartItem.findByPk(cartItemId);

    if (!item) {

        throw new Error("Cart item not found");

    }

    await item.destroy();

};

// ==========================================
// Clear Cart
// ==========================================

const clearCart = async (customerId) => {

    const cart = await getOrCreateCart(customerId);

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