const chatService = require("../services/chatService");

// ==========================================
// Send Message
// ==========================================

const sendMessage = async (req, res, next) => {

    try {

        const message = await chatService.sendMessage(

            req.user.id,

            req.body.receiverId,

            req.body.message

        );

        res.status(201).json({

            success: true,

            message

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Conversation
// ==========================================

const getConversation = async (

    req,

    res,

    next

) => {

    try {

        const messages = await chatService.getConversation(

            req.user.id,

            req.params.userId

        );

        res.status(200).json({

            success: true,

            messages

        });

    }

    catch (error) {

        next(error);

    }

};

// ==========================================
// Chat List
// ==========================================

const getChatUsers = async (

    req,

    res,

    next

) => {

    try {

        const users = await chatService.getChatUsers(

            req.user.id

        );

        res.status(200).json({

            success: true,

            users

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    sendMessage,

    getConversation,

    getChatUsers

};