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