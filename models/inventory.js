const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventory = sequelize.define(
    "Inventory",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },

        totalQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        reservedQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        availableQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        lowStockThreshold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },

        unit: {
            type: DataTypes.ENUM(
                "kg",
                "gram",
                "liter",
                "piece",
                "dozen",
                "packet"
            ),
            allowNull: false
        },

        lastRestockedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "inventories",
        timestamps: true
    }
);

module.exports = Inventory;