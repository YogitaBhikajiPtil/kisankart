const inventoryService = require("../services/inventoryService");

// ==========================================
// Get Inventory
// ==========================================

const getInventory = async (req, res, next) => {

    try {

        const result = await inventoryService.getInventory(

            req.user.id,

            req.query

        );

        return res.status(200).json({

            success: true,

            ...result

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Stock In
// ==========================================

const stockIn = async (req, res, next) => {

    try {

        const inventory = await inventoryService.stockIn(

            req.params.id,

            req.user.id,

            req.body.quantity

        );

        return res.status(200).json({

            success: true,

            message: "Stock updated successfully.",

            inventory

        });

    } catch (error) {

        next(error);

    }

};

// ==========================================
// Stock Out
// ==========================================

const stockOut = async (req, res, next) => {

    try {

        const inventory = await inventoryService.stockOut(

            req.params.id,

            req.user.id,

            req.body.quantity

        );

        return res.status(200).json({

            success: true,

            message: "Stock removed successfully.",

            inventory

        });

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getInventory,

    stockIn,

    stockOut

};