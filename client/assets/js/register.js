// ===============================
// KisanKart - Register Page
// ===============================

const registerForm = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const roleInput = document.getElementById("role");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// ===============================
// Auto Select Role From URL
// register.html?role=farmer
// ===============================

const params = new URLSearchParams(window.location.search);
const selectedRole = params.get("role");

if (selectedRole) {
    roleInput.value = selectedRole;
}

// ===============================
// Show / Hide Password
// ===============================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }

});

toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");
    }

});

// ===============================
// Allow Only Numbers In Phone
// ===============================

phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

// ===============================
// Register Form
// ===============================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const phone = phoneInput.value.trim();
    const role = roleInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation

    if (!name || !email || !phone || !role || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (phone.length !== 10) {
        alert("Enter a valid 10 digit mobile number.");
        return;
    }

    if (password.length < 6) {
        alert("Password should be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        name,
        email,
        phone,
        role,
        password
    };

    try {

        const response = await fetch("http://localhost:5000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            registerForm.reset();

            window.location.href = "login.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server error. Please try again later.");

    }

});