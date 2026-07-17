console.log("APP FILE RUNNING");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const profileRoutes = require("./routes/profileRoutes");
const customerProductRoutes = require("./routes/customerProductRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const customerOrderRoutes = require("./routes/customerOrderRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const adminRoutes = require("./routes/adminRoutes");
const farmerOrderRoutes = require("./routes/farmerOrderRoutes");
const chatRoutes = require("./routes/chatRoutes")
const paymentRoutes = require("./routes/paymentRoutes");





const app = express();

// ===============================
// Middlewares
// ===============================

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to KisanKart API 🚀"
    });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/inventory", inventoryRoutes);
app.use("/api/farmer/analytics", analyticsRoutes);
app.use(
    "/api/farmer/profile",
    profileRoutes
);

app.use(
    "/api/customer/products",
    customerProductRoutes
);
app.use(
    "/api/customer/cart",
    cartRoutes
);

app.use(
    "/api/customer/wishlist",
    wishlistRoutes
);

app.use(

    "/api/customer/address",

    addressRoutes

);

app.use(
    "/api/customer/orders",
    customerOrderRoutes
);

app.use("/api/customer/checkout", checkoutRoutes);

app.use(

    "/api/admin",

    adminRoutes

);

app.use(
    "/api/farmer/orders",
    farmerOrderRoutes
);
app.use(

    "/api/customer/payment",

    paymentRoutes

);

app.use("/api/chat",chatRoutes);





// ===============================
// 404 Route
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;