const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// Verify JWT Token
// ==========================================

const authenticate = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Access denied. Token missing."
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findByPk(decoded.id, {
            attributes: {
                exclude: ["password"]
            }
        });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User not found."
            });

        }

        if (!user.isActive) {

            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated."
            });

        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};

// ==========================================
// Role Based Authorization
// ==========================================

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource."
            });

        }

        next();

    };

};

module.exports = {
    authenticate,
    authorize
};