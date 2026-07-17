const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const OrderStatusHistory = sequelize.define(
    "OrderStatusHistory",
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

        status: {

            type: DataTypes.STRING,

            allowNull: false

        },

        remarks: {

            type: DataTypes.TEXT,

            allowNull: true

        },

        updatedBy: {

            type: DataTypes.INTEGER,

            allowNull: false

        }

    },
    {
        tableName: "order_status_history",

        timestamps: true
    }
);

module.exports = OrderStatusHistory;