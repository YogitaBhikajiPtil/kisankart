const customerService = require("../services/customerService");

// ==========================================
// Customer Dashboard
// ==========================================

const getDashboard = async (req, res, next) => {

    try {

        const dashboard = await customerService.getDashboard(req.user.id);

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