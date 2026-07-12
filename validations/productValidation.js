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
// Add Product Validation
// ==========================================

const addProductValidation = [

    body("categoryId")
        .notEmpty()
        .withMessage("Category is required.")
        .isInt({ min: 1 })
        .withMessage("Invalid category."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Product name must be between 3 and 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters."),

    body("price")
        .notEmpty()
        .withMessage("Price is required.")
        .isFloat({ min: 1 })
        .withMessage("Price must be greater than 0."),

    body("totalQuantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 0 })
        .withMessage("Quantity cannot be negative."),

    body("unit")
        .notEmpty()
        .withMessage("Unit is required.")
        .isIn([
            "kg",
            "gram",
            "liter",
            "piece",
            "dozen",
            "packet"
        ])
        .withMessage("Invalid unit."),

    body("isOrganic")
        .optional()
        .isBoolean()
        .withMessage("isOrganic must be true or false."),

    body("status")
        .optional()
        .isIn([
            "Available",
            "Out Of Stock",
            "Hidden"
        ])
        .withMessage("Invalid status."),

    body("lowStockThreshold")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Invalid low stock threshold."),

    body("harvestDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid harvest date."),

    body("expiryDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid expiry date."),

    validate

];

// ==========================================
// Update Product Validation
// ==========================================

const updateProductValidation = [

    body("categoryId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Invalid category."),

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("Product name must be between 3 and 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters."),

    body("price")
        .optional()
        .isFloat({ min: 1 })
        .withMessage("Invalid price."),

    body("status")
        .optional()
        .isIn([
            "Available",
            "Out Of Stock",
            "Hidden"
        ])
        .withMessage("Invalid status."),

    validate

];

module.exports = {
    addProductValidation,
    updateProductValidation
};