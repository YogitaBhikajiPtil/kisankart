// ==========================================
// KisanKart - Farmer Dashboard
// ==========================================

// Authentication

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {

    window.location.href = "../login.html";

}

if (user.role !== "farmer") {

    alert("Unauthorized Access");

    localStorage.clear();

    window.location.href = "../login.html";

}

// ==========================================
// DOM Elements
// ==========================================

const farmerName = document.getElementById("farmerName");

const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const lowStock = document.getElementById("lowStock");

const productTable = document.getElementById("productTable");

const addProductBtn = document.getElementById("addProductBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ==========================================
// Logged In Farmer
// ==========================================

farmerName.textContent = user.name;

// ==========================================
// Load Dashboard
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/farmer/dashboard",
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

        // Summary

        totalProducts.textContent = data.summary.totalProducts;
        totalOrders.textContent = data.summary.totalOrders;
        totalRevenue.textContent = `₹${data.summary.totalRevenue}`;
        lowStock.textContent = data.summary.lowStockProducts;

        // Products

        productTable.innerHTML = "";

        data.products.forEach(product => {

            const image =
                product.images.length > 0
                    ? product.images[0].imageUrl
                    : "../images/no-image.png";

            productTable.innerHTML += `

                <tr>

                    <td>

                        <img
                            src="${image}"
                            class="product-image"
                            alt="${product.name}"
                        >

                    </td>

                    <td>${product.name}</td>

                    <td>${product.category.name}</td>

                    <td>₹${product.price}</td>

                    <td>

                        ${product.inventory.availableQuantity}
                        ${product.inventory.unit}

                    </td>

                    <td>

                        <span class="status ${product.status.toLowerCase().replaceAll(" ","-")}">

                            ${product.status}

                        </span>

                    </td>

                    <td>

                        <button
                            class="action-btn edit-btn"
                            onclick="editProduct(${product.id})">

                            Edit

                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteProduct(${product.id})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Add Product
// ==========================================

addProductBtn.addEventListener("click", () => {

    window.location.href = "./addProduct.html";

});

// ==========================================
// Edit Product
// ==========================================

function editProduct(id) {

    window.location.href = `./editProduct.html?id=${id}`;

}

// ==========================================
// Delete Product
// ==========================================

async function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {

        return;

    }

    try {

        const response = await fetch(

            `http://localhost:5000/api/products/${id}`,

            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert(data.message);

        loadDashboard();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Logout
// ==========================================

logoutBtn.addEventListener("click", (event) => {

    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "../login.html";

});

// ==========================================
// Initialize
// ==========================================

loadDashboard();