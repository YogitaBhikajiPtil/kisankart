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