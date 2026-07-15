const express = require("express");

const router = express.Router();

const {

    getDashboard,
    getFarmerOrders,

    updateOrderStatus,

    getOrderDetails

} = require("../controllers/farmerOrderController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

router.use(

    authenticate,

    authorize("farmer")

);

router.get(
"/dashboard",
getDashboard
);

router.get(

    "/",

    getFarmerOrders

);

router.get(

    "/:id",

    getOrderDetails

);

router.patch(
    "/:id/status",
    updateOrderStatus
);

module.exports = router;