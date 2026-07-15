const express = require("express");

const router = express.Router();

const {

    getAnalytics

} = require("../controllers/analyticsController");

const {

    authenticate,

    authorize

} = require("../middleware/authMiddleware");

router.get(

    "/",

    authenticate,

    authorize("farmer"),

    getAnalytics

);

module.exports = router;