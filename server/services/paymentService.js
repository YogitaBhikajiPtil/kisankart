const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const {

    Order,

    Payment

} = require("../models");


// ==========================================
// Create Razorpay Order
// ==========================================

const createOrder = async (orderId) => {

    const order = await Order.findByPk(orderId);

    if (!order) {

        throw new Error("Order not found");

    }

    const payment = await Payment.findOne({

        where: {

            orderId

        }

    });

    if (!payment) {

        throw new Error("Payment not found");

    }

    const options = {

        amount: Math.round(Number(order.totalAmount) * 100),

        currency: "INR",

        receipt: order.orderNumber

    };

    const razorpayOrder = await razorpay.orders.create(options);

    payment.razorpayOrderId = razorpayOrder.id;

    payment.amount = order.totalAmount;

    payment.currency = "INR";

    await payment.save();

    return {

        order: razorpayOrder,

        key: process.env.RAZORPAY_KEY_ID

    };

};


// ==========================================
// Verify Payment
// ==========================================

const verifyPayment = async (data) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    } = data;


    const generatedSignature = crypto

        .createHmac(

            "sha256",

            process.env.RAZORPAY_KEY_SECRET

        )

        .update(

            razorpay_order_id +

            "|" +

            razorpay_payment_id

        )

        .digest("hex");


    if (generatedSignature !== razorpay_signature) {

        throw new Error("Payment verification failed");

    }


    const payment = await Payment.findOne({

        where: {

            razorpayOrderId: razorpay_order_id

        }

    });

    if (!payment) {

        throw new Error("Payment not found");

    }

    payment.razorpayPaymentId = razorpay_payment_id;

    payment.transactionId = razorpay_payment_id;

    payment.paymentStatus = "Paid";

    payment.paidAt = new Date();

    await payment.save();


    await Order.update(

        {

            paymentStatus: "Paid"

        },

        {

            where: {

                id: payment.orderId

            }

        }

    );


    return payment;

};


module.exports = {

    createOrder,

    verifyPayment

};