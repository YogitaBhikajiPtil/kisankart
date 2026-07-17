const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getAvailableOrders,
    acceptDelivery,
    getMyDeliveries,
    markDelivered
} = require("../controllers/deliveryController");

router.use(
    authenticate,
    authorize("delivery")
);

// Available orders
router.get(
    "/available",
    getAvailableOrders
);

// Accept delivery
router.patch(
    "/:id/accept",
    acceptDelivery
);

// My deliveries
router.get(
    "/my",
    getMyDeliveries
);

// Mark delivered
router.patch(
    "/:id/delivered",
    markDelivered
);

module.exports = router;