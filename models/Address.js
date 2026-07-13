const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Address = sequelize.define(
    "Address",
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

        fullName: {

            type: DataTypes.STRING,

            allowNull: false

        },

        mobile: {

            type: DataTypes.STRING(10),

            allowNull: false,

            validate: {

                len: [10, 10],

                isNumeric: true

            }

        },

        addressLine1: {

            type: DataTypes.STRING,

            allowNull: false

        },

        addressLine2: {

            type: DataTypes.STRING,

            allowNull: true

        },

        city: {

            type: DataTypes.STRING,

            allowNull: false

        },

        state: {

            type: DataTypes.STRING,

            allowNull: false

        },

        pincode: {

            type: DataTypes.STRING,

            allowNull: false,

            validate: {

                len: [6, 6],

                isNumeric: true

            }

        },

        landmark: {

            type: DataTypes.STRING,

            allowNull: true

        },

        addressType: {

            type: DataTypes.ENUM(

                "Home",

                "Work",

                "Other"

            ),

            defaultValue: "Home"

        },

        isDefault: {

            type: DataTypes.BOOLEAN,

            defaultValue: false

        }

    },
    {
        tableName: "addresses",

        timestamps: true
    }
);

module.exports = Address;