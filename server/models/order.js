const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define(
    "Order",
    {
        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },

        orderNumber: {

            type: DataTypes.STRING,

            allowNull: false,

            unique: true

        },

        customerId: {

            type: DataTypes.INTEGER,

            allowNull: false

        },

        farmerId: {

            type: DataTypes.INTEGER,

            allowNull: false

        },

        addressId: {

            type: DataTypes.INTEGER,

            allowNull: false

        },

        deliveryPartnerId: {

            type: DataTypes.INTEGER,

            allowNull: true

        },

        subtotal: {

            type: DataTypes.DECIMAL(10,2),

            allowNull: false

        },

        deliveryCharge: {

            type: DataTypes.DECIMAL(10,2),

            defaultValue: 0

        },

        tax: {

            type: DataTypes.DECIMAL(10,2),

            defaultValue: 0

        },

        discount: {

            type: DataTypes.DECIMAL(10,2),

            defaultValue: 0

        },

        totalAmount: {

            type: DataTypes.DECIMAL(10,2),

            allowNull: false

        },

        paymentMethod: {

            type: DataTypes.ENUM(

                "COD",

                "ONLINE"

            ),

            defaultValue: "COD"

        },

        paymentStatus: {

            type: DataTypes.ENUM(

                "Pending",

                "Paid",

                "Failed",

                "Refunded"

            ),

            defaultValue: "Pending"

        },

        orderStatus: {

            type: DataTypes.ENUM(

                "Pending",

                "Accepted",

                "Rejected",

                "Packed",

                "Ready For Pickup",

                "Out For Delivery",

                "Delivered",

                "Cancelled"

            ),

            defaultValue: "Pending"

        },

        placedAt: {

            type: DataTypes.DATE,

            defaultValue: DataTypes.NOW

        },

        deliveredAt: {

            type: DataTypes.DATE,

            allowNull: true

        }

    },
    {
        tableName: "orders",

        timestamps: true
    }
);

module.exports = Order;