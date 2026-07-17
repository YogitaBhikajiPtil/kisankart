const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
            validate: {
                notEmpty: true
            }
        },

        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: "categories",
        timestamps: true
    }
);

module.exports = Category;