const farmerService = require("../services/farmerService");

// ==========================================
// Farmer Dashboard
// ==========================================

const getDashboard = async (req, res, next) => {

    try {

        const dashboard = await farmerService.getDashboard(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            ...dashboard
        });

    } catch (error) {

        next(error);

    }

};

const getMyProducts = async (req, res, next) => {

    try {

        const products = await farmerService.getMyProducts(
            req.user.id,
            req.query
        );

        return res.status(200).json({
            success: true,
            ...products
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    getDashboard,
    getMyProducts
};