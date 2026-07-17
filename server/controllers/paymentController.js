const paymentService = require("../services/paymentService");

// ==========================================
// Create Razorpay Order
// ==========================================

const createOrder = async (req, res) => {

    try {

        const response = await paymentService.createOrder(

            req.params.orderId

        );

        res.status(200).json({

            success: true,

            message: "Razorpay order created successfully",

            order: response.order,

            key: response.key

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// Verify Payment
// ==========================================

const verifyPayment = async (req, res) => {

    try {

        const payment = await paymentService.verifyPayment(

            req.body

        );

        res.status(200).json({

            success: true,

            message: "Payment Successful",

            payment

        });

    }

    catch (error) {

        res.status(400).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    createOrder,

    verifyPayment

};