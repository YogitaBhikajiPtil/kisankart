const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Inventory = require("./Inventory");

// ==========================================
// User <-> Product
// ==========================================

User.hasMany(Product, {
    foreignKey: "farmerId",
    as: "products",
    onDelete: "CASCADE"
});

Product.belongsTo(User, {
    foreignKey: "farmerId",
    as: "farmer"
});

// ==========================================
// Category <-> Product
// ==========================================

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products"
});

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category"
});

// ==========================================
// Product <-> ProductImage
// ==========================================

Product.hasMany(ProductImage, {
    foreignKey: "productId",
    as: "images",
    onDelete: "CASCADE"
});

ProductImage.belongsTo(Product, {
    foreignKey: "productId",
    as: "product"
});

// ==========================================
// Product <-> Inventory
// ==========================================

Product.hasOne(Inventory, {
    foreignKey: "productId",
    as: "inventory",
    onDelete: "CASCADE"
});

Inventory.belongsTo(Product, {
    foreignKey: "productId",
    as: "product"
});

// ==========================================

module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    Inventory
};