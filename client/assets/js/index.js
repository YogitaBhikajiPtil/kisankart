// ==============================
// KisanKart - Home Page
// ==============================

const shopNowBtn = document.getElementById("shopNow");
const becomeFarmerBtn = document.getElementById("becomeFarmer");

// Shop Now Button
shopNowBtn.addEventListener("click", () => {
    window.location.href = "login.html";
});

// Become a Seller Button
becomeFarmerBtn.addEventListener("click", () => {
    window.location.href = "register.html?role=farmer";
});

// Highlight Active Navigation Link
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});

// Sticky Header Shadow on Scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.12)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
    }
});

// Future Features (Sprint 2)
// - Search Products
// - Product Categories
// - Location Detection
// - Dynamic Featured Products
// - Notifications
// - User Authentication Check