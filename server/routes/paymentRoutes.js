console.log("Payment Routes Loaded");

const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const { authenticate } = require("../middleware/authMiddleware");


router.post(
    "/create-order/:orderId",
    authenticate,
    paymentController.createOrder
);


router.post(
    "/verify",
    authenticate,
    paymentController.verifyPayment
);


module.exports = router;