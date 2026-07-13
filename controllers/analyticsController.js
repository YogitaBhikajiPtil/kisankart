const analyticsService = require("../services/analyticsService");

const getAnalytics = async (

    req,

    res,

    next

) => {

    try {

        const analytics = await analyticsService.getAnalytics(

            req.user.id

        );

        return res.status(200).json({

            success: true,

            analytics

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    getAnalytics

};