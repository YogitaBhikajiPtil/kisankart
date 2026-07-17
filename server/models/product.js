const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        farmerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

       categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
},

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

        harvestDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        expiryDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        isOrganic: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        status: {
            type: DataTypes.ENUM(
                "Available",
                "Out Of Stock",
                "Hidden"
            ),
            defaultValue: "Available"
        }

    },
    {
        tableName: "products",
        timestamps: true
    }
);

module.exports = Product;