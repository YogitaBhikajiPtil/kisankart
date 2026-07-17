const express = require("express");

const router = express.Router();

const {

    getInventory,

    stockIn,

    stockOut

} = require("../controllers/inventoryController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

// ==========================================
// Get Inventory
// ==========================================

router.get(

    "/",

    authenticate,

    authorize("farmer"),

    getInventory

);

// ==========================================
// Stock In
// ==========================================

router.patch(

    "/:id/stock-in",

    authenticate,

    authorize("farmer"),

    stockIn

);

// ==========================================
// Stock Out
// ==========================================

router.patch(

    "/:id/stock-out",

    authenticate,

    authorize("farmer"),

    stockOut

);

module.exports = router;