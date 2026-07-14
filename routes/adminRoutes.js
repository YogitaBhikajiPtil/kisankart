const express = require("express");

const router = express.Router();

const {

    getDashboard,

    getUsers,

    updateUserStatus,

    getProducts,

    getOrders,

    updateProductStatus,
    deleteProduct

} = require("../controllers/adminController");


const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");



router.use(

    authenticate,

    authorize("admin")

);


// Dashboard

router.get(

    "/dashboard",

    getDashboard

);


// Users

router.get(

    "/users",

    getUsers

);


router.put(

    "/users/:id/status",

    updateUserStatus

);


// Products

router.get(

    "/products",

    getProducts

);


// Orders

router.get(

    "/orders",

    getOrders

);

router.put(
    "/products/:id/status",
    updateProductStatus
);

router.delete(
    "/products/:id",
    deleteProduct
);


module.exports = router;