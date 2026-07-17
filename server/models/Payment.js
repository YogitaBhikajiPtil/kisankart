const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Payment = sequelize.define(
    "Payment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        razorpayOrderId: {
            type: DataTypes.STRING,
            allowNull: true
        },

        razorpayPaymentId: {
            type: DataTypes.STRING,
            allowNull: true
        },

        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },

        currency: {
            type: DataTypes.STRING,
            defaultValue: "INR"
        },

        paymentMethod: {
            type: DataTypes.ENUM(
                "COD",
                "ONLINE"
            ),
            allowNull: false,
            defaultValue: "COD"
        },

        paymentStatus: {
            type: DataTypes.ENUM(
                "Pending",
                "Paid",
                "Failed",
                "Refunded"
            ),
            allowNull: false,
            defaultValue: "Pending"
        },

        transactionId: {
            type: DataTypes.STRING,
            allowNull: true
        },

        paidAt: {
            type: DataTypes.DATE,
            allowNull: true
        }

    },
    {
        tableName: "payments",
        timestamps: true
    }
);

module.exports = Payment;