const { Server } = require("socket.io");

require("dotenv").config();


const http = require("http");

const app = require("./app");

const { sequelize, connectDatabase } = require("./config/database");

// ===============================
// PORT
// ===============================

const PORT = process.env.PORT || 5000;

// ===============================
// HTTP Server
// ===============================

const server = http.createServer(app);

const io = new Server(server, {

    cors: {

        origin: "*",

        methods: [

            "GET",

            "POST"

        ]

    }

});

// ===============================
// Start Server
// ===============================

const startServer = async () => {

    try {

        // Connect MySQL
        await connectDatabase();

        // Create Tables
        await sequelize.sync({
            alter: true
        });

        console.log("✅ Database Synced Successfully.");

        // Start Express Server
        server.listen(PORT, () => {

            console.log("-----------------------------------");
            console.log(`🚀 KisanKart Server Running`);
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("-----------------------------------");

        });

    } catch (error) {

        console.error("❌ Server Failed To Start");
        console.error(error);

    }

};

// ==========================================
// Socket.IO
// ==========================================
const initializeSocket = require("./socket/socket");

initializeSocket(io);

startServer();