// ===============================
// KisanKart - Login Page
// ===============================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const togglePassword = document.getElementById("togglePassword");

// ======================================
// Show / Hide Password
// ======================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        passwordInput.type = "password";

        togglePassword.classList.replace("fa-eye-slash", "fa-eye");

    }

});

// ======================================
// Remember Me
// ======================================

window.addEventListener("DOMContentLoaded", () => {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;

        rememberMe.checked = true;

    }

});

// ======================================
// Login
// ======================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    const password = passwordInput.value;

    if (!email || !password) {

        alert("Please enter email and password.");

        return;

    }

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,

                password

            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        // Save Token

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        // Remember Email

        if (rememberMe.checked) {

            localStorage.setItem("rememberEmail", email);

        } else {

            localStorage.removeItem("rememberEmail");

        }

        alert("Login Successful");

        // Role Based Redirect

        switch (data.user.role) {

            case "customer":

                window.location.href = "./customer/dashboard.html";

                break;

            case "farmer":

                window.location.href = "./farmer/dashboard.html";

                break;

            case "delivery":

                window.location.href = "./delivery/dashboard.html";

                break;

            case "admin":

                window.location.href = "./admin/dashboard.html";

                break;

            default:

                window.location.href = "index.html";

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});