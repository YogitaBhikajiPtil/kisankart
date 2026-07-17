const { body, validationResult } = require("express-validator");

// ==========================================
// Validation Result
// ==========================================

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};

// ==========================================
// Register Validation
// ==========================================

const registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Name must be between 3 and 100 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email address.")
        .normalizeEmail(),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits.")
        .isNumeric()
        .withMessage("Phone number must contain only digits."),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),

    body("role")
        .trim()
        .notEmpty()
        .withMessage("Role is required.")
        .isIn([
            "customer",
            "farmer",
            "delivery"
        ])
        .withMessage("Invalid role."),

    validate

];

// ==========================================
// Login Validation
// ==========================================

const loginValidation = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Invalid email address.")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required."),

    validate

];

module.exports = {

    registerValidation,

    loginValidation

};