const express = require("express");

const router = express.Router();


const {

    getProducts,

    getProductById,

    getCategories

} = require("../controllers/customerProductController");


const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");



// ==========================================
// Get All Products For Customer
// ==========================================

router.get(

    "/",

    authenticate,

    authorize("customer"),

    getProducts

);



// ==========================================
// Get Categories
// ==========================================

router.get(

    "/categories",

    authenticate,

    authorize("customer"),

    getCategories

);



// ==========================================
// Product Details
// ==========================================

router.get(

    "/:id",

    authenticate,

    authorize("customer"),

    getProductById

);



module.exports = router;