const authService = require("../services/authService");

// ===============================
// Register Controller
// ===============================

const register = async (req, res, next) => {

    try {

        const result = await authService.register(req.body);

        return res.status(201).json({
            success: true,
            message: result.message,
            user: result.user
        });

    } catch (error) {

        next(error);

    }

};

// ===============================
// Login Controller
// ===============================

const login = async (req, res, next) => {

    try {

        const result = await authService.login(req.body);

        return res.status(200).json({
            success: true,
            message: result.message,
            token: result.token,
            user: result.user
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    register,
    login
};