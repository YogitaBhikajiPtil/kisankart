const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../validations/authValidation");

// ==========================================
// Authentication Routes
// ==========================================

// Register
router.post(
    "/register",
    registerValidation,
    register
);

// Login
router.post(
    "/login",
    loginValidation,
    login
);

module.exports = router;