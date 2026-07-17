const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Message = sequelize.define(
    "Message",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "messages",
        timestamps: true
    }
);

module.exports = Message;