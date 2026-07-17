const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Inventory = require("./Inventory");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const OrderStatusHistory = require("./OrderStatusHistory");
const Address = require("./Address");
const Payment = require("./Payment");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Wishlist = require("./Wishlist");
const Review = require("./Review");
const Notification = require("./Notification");
const Message = require("./Message");


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
// Product <-> Image
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
// Orders
// ==========================================

User.hasMany(Order, {

    foreignKey: "customerId",

    as: "customerOrders"

});


User.hasMany(Order, {

    foreignKey: "farmerId",

    as: "farmerOrders"

});

// Delivery Partner

User.hasMany(Order, {

    foreignKey: "deliveryPartnerId",

    as: "deliveryOrders"

});

Order.belongsTo(User, {

    foreignKey: "deliveryPartnerId",

    as: "deliveryPartner"

});


Order.belongsTo(User, {

    foreignKey: "customerId",

    as: "customer"

});


Order.belongsTo(User, {

    foreignKey: "farmerId",

    as: "farmer"

});


// ==========================================
// Order Items
// ==========================================

Order.hasMany(OrderItem, {

    foreignKey: "orderId",

    as: "items"

});


OrderItem.belongsTo(Order, {

    foreignKey: "orderId",

    as: "order"

});


Product.hasMany(OrderItem, {

    foreignKey: "productId",

    as: "orderItems"

});


OrderItem.belongsTo(Product, {

    foreignKey: "productId",

    as: "product"

});


// ==========================================
// Address
// ==========================================

User.hasMany(Address, {

    foreignKey: "userId",

    as: "addresses"

});


Address.belongsTo(User, {

    foreignKey: "userId",

    as: "user"

});


Address.hasMany(Order, {

    foreignKey: "addressId",

    as: "orders"

});


Order.belongsTo(Address, {

    foreignKey: "addressId",

    as: "address"

});


// ==========================================
// Payment
// ==========================================

Order.hasOne(Payment, {

    foreignKey: "orderId",

    as: "payment"

});


Payment.belongsTo(Order, {

    foreignKey: "orderId",

    as: "order"

});


// ==========================================
// Order Status History
// ==========================================

Order.hasMany(OrderStatusHistory, {

    foreignKey: "orderId",

    as: "statusHistory"

});


OrderStatusHistory.belongsTo(Order, {

    foreignKey: "orderId",

    as: "order"

});


User.hasMany(OrderStatusHistory, {

    foreignKey: "updatedBy",

    as: "updatedStatuses"

});


OrderStatusHistory.belongsTo(User, {

    foreignKey: "updatedBy",

    as: "updatedUser"

});


// ==========================================
// Cart
// ==========================================

User.hasOne(Cart, {

    foreignKey: "userId",

    as: "cart"

});


Cart.belongsTo(User, {

    foreignKey: "userId",

    as: "user"

});


Cart.hasMany(CartItem, {

    foreignKey: "cartId",

    as: "items"

});


CartItem.belongsTo(Cart, {

    foreignKey: "cartId",

    as: "cart"

});


CartItem.belongsTo(Product, {

    foreignKey: "productId",

    as: "product"

});


Product.hasMany(CartItem, {

    foreignKey: "productId",

    as: "cartItems"

});


// ==========================================
// Wishlist
// ==========================================

User.hasMany(Wishlist, {

    foreignKey: "userId",

    as: "wishlist"

});


Wishlist.belongsTo(User, {

    foreignKey: "userId",

    as: "user"

});


Product.hasMany(Wishlist, {

    foreignKey: "productId",

    as: "wishlists"

});


Wishlist.belongsTo(Product, {

    foreignKey: "productId",

    as: "product"

});


// ==========================================
// Reviews
// ==========================================

Product.hasMany(Review, {

    foreignKey: "productId",

    as: "reviews"

});


Review.belongsTo(Product, {

    foreignKey: "productId",

    as: "product"

});


User.hasMany(Review, {

    foreignKey: "customerId",

    as: "reviews"

});


Review.belongsTo(User, {

    foreignKey: "customerId",

    as: "customer"

});


// ==========================================
// Notifications
// ==========================================

User.hasMany(Notification, {

    foreignKey: "userId",

    as: "notifications"

});


Notification.belongsTo(User, {

    foreignKey: "userId",

    as: "user"

});

User.hasMany(Message, {
    foreignKey: "senderId",
    as: "sentMessages"
});

Message.belongsTo(User, {
    foreignKey: "senderId",
    as: "sender"
});

User.hasMany(Message, {
    foreignKey: "receiverId",
    as: "receivedMessages"
});

Message.belongsTo(User, {
    foreignKey: "receiverId",
    as: "receiver"
});
module.exports = {

    User,

    Category,

    Product,

    ProductImage,

    Inventory,

    Order,

    OrderItem,

    OrderStatusHistory,

    Address,

    Payment,

    Cart,

    CartItem,

    Wishlist,

    Review,

    Notification,
    Message

};