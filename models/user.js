const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Email already exists."
            },
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },

        phone: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: {
                msg: "Phone number already exists."
            },
            validate: {
                len: [10, 10],
                isNumeric: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM(
                "customer",
                "farmer",
                "delivery",
                "admin"
            ),
            allowNull: false,
            defaultValue: "customer"
        },

        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        },

        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "users",

        timestamps: true
    }
);

module.exports = User;