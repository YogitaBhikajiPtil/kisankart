const express = require("express");

const router = express.Router();

const {
    getCustomerOrders,
    getOrderDetails
} = require("../controllers/customerOrderController");


const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");


// Get all customer orders

router.get(
    "/",
    authenticate,
    authorize("customer"),
    getCustomerOrders
);


// Get single order

router.get(
    "/:id",
    authenticate,
    authorize("customer"),
    getOrderDetails
);


module.exports = router;