const express = require("express");

const router = express.Router();

const {

    authenticate

} = require("../middleware/authMiddleware");

const {

    sendMessage,

    getConversation,

    getChatUsers

} = require("../controllers/chatController");

router.use(authenticate);

// Chat List

router.get(

    "/users",

    getChatUsers

);

// Conversation

router.get(

    "/:userId",

    getConversation

);

// Send Message

router.post(

    "/",

    sendMessage

);

module.exports = router;