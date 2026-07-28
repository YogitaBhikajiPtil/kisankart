const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile
} = require("../controllers/profileController");


const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");


// Customer Profile

router.get(
    "/",
    authenticate,
    authorize("customer"),
    getProfile
);


// Update Customer Profile

router.put(
    "/",
    authenticate,
    authorize("customer"),
    updateProfile
);


module.exports = router;