const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Notification = sequelize.define(
    "Notification",
    {
        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true

        },

        userId: {

            type: DataTypes.INTEGER,

            allowNull: false

        },

        title: {

            type: DataTypes.STRING,

            allowNull: false,

            validate: {

                notEmpty: true

            }

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
        tableName: "notifications",

        timestamps: true
    }
);

module.exports = Notification;