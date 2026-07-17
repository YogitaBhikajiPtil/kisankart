const express = require("express");

const router = express.Router();

const {

    createOrder

} = require("../controllers/checkoutController");


const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");


// Place Order

router.post(

    "/",

    authenticate,

    authorize("customer"),

    createOrder

);


module.exports = router;