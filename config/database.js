require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",

        logging: false,

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        define: {
            freezeTableName: true,
            timestamps: true
        },

        dialectOptions: {
            charset: "utf8mb4"
        }
    }
);

// Test Database Connection
const connectDatabase = async () => {
    try {

        await sequelize.authenticate();

        console.log("✅ MySQL Connected Successfully.");

    } catch (error) {

        console.error("❌ Database Connection Failed");
        console.error(error.message);

        process.exit(1);

    }
};

module.exports = {
    sequelize,
    connectDatabase
};