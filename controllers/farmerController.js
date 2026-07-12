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

module.exports = {
    getDashboard
};