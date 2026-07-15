const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDashboard
} = require("../controllers/customerController");

// ==========================================
// Customer Routes
// ==========================================

// Dashboard
router.get(
    "/dashboard",
    authenticate,
    authorize("customer"),
    getDashboard
);

module.exports = router;