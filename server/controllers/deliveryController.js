const deliveryService = require("../services/deliveryService");

// ==========================================
// Get Available Orders
// ==========================================

const getAvailableOrders = async (req, res, next) => {

    try {

        const orders = await deliveryService.getAvailableOrders();

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Accept Delivery
// ==========================================

const acceptDelivery = async (req, res, next) => {

    try {

        const order = await deliveryService.acceptDelivery(

            req.params.id,

            req.user.id

        );

        res.status(200).json({

            success: true,

            message: "Order assigned successfully.",

            order

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// My Deliveries
// ==========================================

const getMyDeliveries = async (req, res, next) => {

    try {

        const orders = await deliveryService.getMyDeliveries(

            req.user.id

        );

        res.status(200).json({

            success: true,

            orders

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Mark Delivered
// ==========================================

const markDelivered = async (req, res, next) => {

    try {

        const order = await deliveryService.markDelivered(

            req.params.id,

            req.user.id

        );

        res.status(200).json({

            success: true,

            message: "Order delivered successfully.",

            order

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    getAvailableOrders,

    acceptDelivery,

    getMyDeliveries,

    markDelivered

};