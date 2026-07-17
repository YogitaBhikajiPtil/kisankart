const {
    User,
    Product,
    Order,
    ProductImage,
    Category
} = require("../models");

const { Op } = require("sequelize");

// ==========================================
// Dashboard
// ==========================================

const getDashboard = async () => {

    const totalCustomers = await User.count({
        where: {
            role: "customer"
        }
    });

    const totalFarmers = await User.count({
        where: {
            role: "farmer"
        }
    });

    const totalDeliveryPartners = await User.count({
        where: {
            role: "delivery"
        }
    });

    const totalAdmins = await User.count({
        where: {
            role: "admin"
        }
    });

    const totalProducts = await Product.count();

    const totalOrders = await Order.count();

    const totalCategories = await Category.count();

    const activeUsers = await User.count({
        where: {
            isActive: true
        }
    });

    const verifiedUsers = await User.count({
        where: {
            isVerified: true
        }
    });

    // Revenue only from delivered orders

    const deliveredOrders = await Order.findAll({
        where: {
            orderStatus: "Delivered"
        }
    });

    let totalRevenue = 0;

    deliveredOrders.forEach(order => {
        totalRevenue += Number(order.totalAmount);
    });

    return {

        totalCustomers,

        totalFarmers,

        totalDeliveryPartners,

        totalAdmins,

        totalProducts,

        totalOrders,

        totalCategories,

        activeUsers,

        verifiedUsers,

        totalRevenue

    };

};

// ==========================================
// Get Users
// ==========================================

const getUsers = async () => {

    return await User.findAll({

        attributes: {

            exclude: ["password"]

        },

        order: [

            ["createdAt", "DESC"]

        ]

    });

};

// ==========================================
// Activate / Deactivate User
// ==========================================

const updateUserStatus = async (

    userId,

    isActive

) => {

    const user = await User.findByPk(userId);

    if (!user) {

        throw new Error("User not found");

    }

    user.isActive = isActive;

    await user.save();

    return user;

};

// ==========================================
// Get Products
// ==========================================

const getProducts = async () => {

    return await Product.findAll({

        include: [

            {

                model: User,

                as: "farmer",

                attributes: [

                    "id",

                    "name",

                    "email"

                ]

            },

            {

                model: Category,

                as: "category"

            },
            {
        model: ProductImage,
        as: "images"
    }

        ],

        order: [

            ["createdAt", "DESC"]

        ]

    });

};

// ==========================================
// Get Orders
// ==========================================

const getOrders = async () => {

    return await Order.findAll({

        include: [

            {

                model: User,

                as: "customer",

                attributes: [

                    "id",

                    "name",

                    "email"

                ]

            },

            {

                model: User,

                as: "farmer",

                attributes: [

                    "id",

                    "name"

                ]

            }

        ],

        order: [

            ["createdAt", "DESC"]

        ]

    });

};

// ==========================================
// Hide / Unhide Product
// ==========================================

const updateProductStatus = async (

    productId,

    status

) => {

    const product = await Product.findByPk(productId);

    if (!product) {

        throw new Error("Product not found");

    }

    product.status = status;

    await product.save();

    return product;

};


// ==========================================
// Delete Product
// ==========================================

const deleteProduct = async (productId) => {

    const product = await Product.findByPk(productId);

    if (!product) {

        throw new Error("Product not found");

    }

    await product.destroy();

};

module.exports = {

    getDashboard,

    getUsers,

    updateUserStatus,

    getProducts,

    getOrders,
    updateProductStatus,
deleteProduct

};