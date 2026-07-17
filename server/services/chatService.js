const {
    Message,
    User
} = require("../models");

const { Op } = require("sequelize");

// ==========================================
// Send Message
// ==========================================

const sendMessage = async (

    senderId,

    receiverId,

    message

) => {

    return await Message.create({

        senderId,

        receiverId,

        message,

        isRead: false

    });

};

// ==========================================
// Get Conversation
// ==========================================

const getConversation = async (

    userId,

    otherUserId

) => {

    await Message.update(

        {
            isRead: true
        },

        {

            where: {

                senderId: otherUserId,

                receiverId: userId,

                isRead: false

            }

        }

    );

    return await Message.findAll({

        where: {

            [Op.or]: [

                {

                    senderId: userId,

                    receiverId: otherUserId

                },

                {

                    senderId: otherUserId,

                    receiverId: userId

                }

            ]

        },

        order: [

            ["createdAt", "ASC"]

        ]

    });

};

// ==========================================
// Chat List
// ==========================================

const getChatUsers = async (userId) => {

    const messages = await Message.findAll({

        where: {

            [Op.or]: [

                {

                    senderId: userId

                },

                {

                    receiverId: userId

                }

            ]

        },

        include: [

            {

                model: User,

                as: "sender",

                attributes: [

                    "id",

                    "name",

                    "role",

                    "profileImage"

                ]

            },

            {

                model: User,

                as: "receiver",

                attributes: [

                    "id",

                    "name",

                    "role",

                    "profileImage"

                ]

            }

        ],

        order: [

            ["createdAt", "DESC"]

        ]

    });

    const users = [];

    const ids = new Set();

    for (const message of messages) {

        const other =

            message.senderId == userId

                ? message.receiver

                : message.sender;

        if (!other) continue;

        if (ids.has(other.id)) continue;

        ids.add(other.id);

        const unread = await Message.count({

            where: {

                senderId: other.id,

                receiverId: userId,

                isRead: false

            }

        });

        users.push({

            id: other.id,

            name: other.name,

            role: other.role,

            profileImage: other.profileImage,

            lastMessage: message.message,

            lastTime: message.createdAt,

            unread

        });

    }

    return users;

};

module.exports = {

    sendMessage,

    getConversation,

    getChatUsers

};