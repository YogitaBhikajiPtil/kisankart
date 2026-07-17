const User = require("../models/user");

// ==========================================
// Customer Dashboard Service
// ==========================================

const getDashboard = async (userId) => {

    // Logged In User

    const user = await User.findByPk(userId, {
        attributes: [
            "id",
            "name",
            "email",
            "role"
        ]
    });

    if (!user) {
        throw new Error("Customer not found.");
    }

    /*
        NOTE

        Orders, Wishlist, Cart, Payments and other
        modules are not created yet.

        Currently returning dummy data.

        Later this service will fetch data from:

        Order Model
        Wishlist Model
        Payment Model
        Product Model
    */

    return {

        user,

        summary: {

            totalOrders: 0,

            wishlistCount: 0,

            totalSpent: 0,

            savedMoney: 0

        },

        orders: []

    };

};

module.exports = {

    getDashboard

};