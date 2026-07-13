const orderService = require("../services/orderService");

// ==========================================
// Dashboard
// ==========================================

const getDashboard = async (req, res, next) => {

    try {

        const dashboard = await orderService.getDashboard(

            req.user.id

        );

        return res.status(200).json({

            success: true,

            dashboard

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Orders
// ==========================================

const getOrders = async (req, res, next) => {

    try {

        const result = await orderService.getOrders(

            req.user.id,

            req.query

        );

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Single Order
// ==========================================

const getOrderById = async (req, res, next) => {

    try {

        const order = await orderService.getOrderById(

            req.params.id,

            req.user.id

        );

        return res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Update Status
// ==========================================

const updateOrderStatus = async (req, res, next) => {

    try {

        const order = await orderService.updateOrderStatus(

            req.params.id,

            req.user.id,

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Order updated successfully.",

            order

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getDashboard,

    getOrders,

    getOrderById,

    updateOrderStatus

};