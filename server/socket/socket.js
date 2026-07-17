const { Message } = require("../models");

module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log("Socket Connected:", socket.id);

        // ===============================
        // Join Room
        // ===============================

        socket.on("join", (userId) => {

            socket.join(userId.toString());

            console.log(`User ${userId} joined`);

        });

        // ===============================
        // Notify New Message
        // ===============================

        socket.on("newMessage", (message) => {

            io.to(message.receiverId.toString()).emit(

                "receiveMessage",

                message

            );

            io.to(message.receiverId.toString()).emit(

                "chatListUpdated"

            );

            io.to(message.senderId.toString()).emit(

                "chatListUpdated"

            );

        });

        // ===============================
        // Disconnect
        // ===============================

        socket.on("disconnect", () => {

            console.log("Disconnected:", socket.id);

        });

    });

};