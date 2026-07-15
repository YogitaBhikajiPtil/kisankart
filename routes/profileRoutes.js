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


// Get Farmer Profile

router.get(

    "/",

    authenticate,

    authorize("farmer"),

    getProfile

);


// Update Farmer Profile

router.put(

    "/",

    authenticate,

    authorize("farmer"),

    updateProfile

);


module.exports = router;