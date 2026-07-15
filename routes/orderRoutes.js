const express = require("express");

const router = express.Router();

const {

    getDashboard,

    getOrders,

    getOrderById,

    updateOrderStatus

} = require("../controllers/orderController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

// ==========================================
// Dashboard
// ==========================================

router.get(

    "/dashboard",

    authenticate,

    authorize("farmer"),

    getDashboard

);

// ==========================================
// Get All Orders
// ==========================================

router.get(

    "/",

    authenticate,

    authorize("farmer"),

    getOrders

);

// ==========================================
// Get Single Order
// ==========================================

router.get(

    "/:id",

    authenticate,

    authorize("farmer"),

    getOrderById

);

// ==========================================
// Update Status
// ==========================================

router.patch(

    "/:id/status",

    authenticate,

    authorize("farmer"),

    updateOrderStatus

);

module.exports = router;