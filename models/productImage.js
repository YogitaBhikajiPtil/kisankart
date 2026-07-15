const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");

const ProductImage = sequelize.define(
    "ProductImage",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        displayOrder: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        tableName: "productImages",
        timestamps: true
    }
);

module.exports = ProductImage;