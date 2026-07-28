// =========================================
// KisanKart - Customer Dashboard
// =========================================

// Check Authentication
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {

    window.location.href = "../login.html";

}

// Role Check
if (user.role !== "customer") {

    alert("Unauthorized Access");

    localStorage.clear();

    window.location.href = "../login.html";

}

// =========================================
// DOM Elements
// =========================================

const customerName = document.getElementById("customerName");

const totalOrders = document.getElementById("totalOrders");

const wishlistCount = document.getElementById("wishlistCount");

const totalSpent = document.getElementById("totalSpent");

const savedMoney = document.getElementById("savedMoney");

const ordersTable = document.getElementById("ordersTable");

const logoutBtn = document.getElementById("logoutBtn");

// =========================================
// Show Logged In User
// =========================================

customerName.textContent = user.name;

// =========================================
// Dashboard Data
// =========================================

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/customer/dashboard",
            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        // Summary Cards

        totalOrders.textContent = data.summary.totalOrders;

        wishlistCount.textContent = data.summary.wishlistCount;

        totalSpent.textContent = `₹${data.summary.totalSpent}`;

        savedMoney.textContent = `₹${data.summary.savedMoney}`;

        // Orders Table

        ordersTable.innerHTML = "";

        data.orders.forEach(order => {

            ordersTable.innerHTML += `

                <tr>

                    <td>#${order.id}</td>

                    <td>${order.product}</td>

                    <td>${order.farmer}</td>

                    <td>₹${order.amount}</td>

                    <td>

                        <span class="status ${order.status.toLowerCase()}">

                            ${order.status}

                        </span>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =========================================
// Logout
// =========================================

logoutBtn.addEventListener("click", (event) => {

    event.preventDefault();

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "../login.html";

});

// =========================================
// Initialize
// =========================================

loadDashboard();