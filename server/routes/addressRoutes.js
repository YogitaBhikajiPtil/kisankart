const express = require("express");

const router = express.Router();

const {

    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress

} = require("../controllers/addressController");


const {

    authenticate,
    authorize

} = require("../middleware/authMiddleware");


// Get all addresses

router.get(

    "/",

    authenticate,

    authorize("customer"),

    getAddresses

);


// Create address

router.post(

    "/",

    authenticate,

    authorize("customer"),

    createAddress

);


// Update address

router.put(

    "/:id",

    authenticate,

    authorize("customer"),

    updateAddress

);


// Delete address

router.delete(

    "/:id",

    authenticate,

    authorize("customer"),

    deleteAddress

);


module.exports = router;