const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// ===============================
// Register Service
// ===============================

const register = async (userData) => {

    const {
        name,
        email,
        phone,
        password,
        role
    } = userData;

    // Check Email

    const existingEmail = await User.findOne({
        where: {
            email
        }
    });

    if (existingEmail) {
        throw new Error("Email already registered.");
    }

    // Check Phone

    const existingPhone = await User.findOne({
        where: {
            phone
        }
    });

    if (existingPhone) {
        throw new Error("Phone number already registered.");
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User

    const user = await User.create({

        name,

        email,

        phone,

        password: hashedPassword,

        role

    });

    return {

        message: "Registration Successful",

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            phone: user.phone,

            role: user.role

        }

    };

};

// ===============================
// Login Service
// ===============================

const login = async (loginData) => {

    const {
        email,
        password
    } = loginData;

    const user = await User.findOne({

        where: {
            email
        }

    });

    if (!user) {

        throw new Error("Invalid Email or Password.");

    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {

        throw new Error("Invalid Email or Password.");

    }

    // Update Last Login

    user.lastLogin = new Date();

    await user.save();

    // JWT

    const token = jwt.sign(

        {

            id: user.id,

            role: user.role

        },

        process.env.JWT_SECRET,

        {

            expiresIn: process.env.JWT_EXPIRES_IN

        }

    );

    return {

        message: "Login Successful",

        token,

        user: {

            id: user.id,

            name: user.name,

            email: user.email,

            role: user.role,

            isVerified: user.isVerified

        }

    };

};

module.exports = {

    register,

    login

};