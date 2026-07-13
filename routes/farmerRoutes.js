const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDashboard,
    getMyProducts
} = require("../controllers/farmerController");

// ==========================================
// Farmer Routes
// ==========================================

// Dashboard
router.get(
    "/dashboard",
    authenticate,
    authorize("farmer"),
    getDashboard
);

// ==========================================
// My Products
// ==========================================

router.get(
    "/products",
    authenticate,
    authorize("farmer"),
    getMyProducts
);

module.exports = router;