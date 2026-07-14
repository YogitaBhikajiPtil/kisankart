// ==========================================
// KisanKart - My Products
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
// API URL
// ==========================================

const API_URL = "http://localhost:5000/api";

// ==========================================
// DOM Elements
// ==========================================

const productsTable = document.getElementById("productsTable");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");
const logoutBtn = document.getElementById("logoutBtn");

// ==========================================
// State
// ==========================================

let currentPage = 1;
const limit = 10;

// ==========================================
// Load Categories
// ==========================================

async function loadCategories() {

    try {

        const response = await fetch(`${API_URL}/categories`);

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        data.categories.forEach(category => {

            categoryFilter.innerHTML += `

                <option value="${category.id}">

                    ${category.name}

                </option>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// Load Products
// ==========================================

async function loadProducts() {

    try {

        const params = new URLSearchParams({

            page: currentPage,

            limit,

            keyword: searchInput.value.trim(),

            categoryId: categoryFilter.value,

            status: statusFilter.value

        });

        const response = await fetch(

            `${API_URL}/farmer/products?${params.toString()}`,

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

        renderProducts(data.products);

        renderPagination(data.totalPages);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Render Products
// ==========================================

function renderProducts(products) {

    productsTable.innerHTML = "";

    if (products.length === 0) {

        productsTable.innerHTML = `

            <tr>

                <td colspan="7">

                    No products found.

                </td>

            </tr>

        `;

        return;

    }

    products.forEach(product => {

        const image = product.images.length
            ? `http://localhost:5000${product.images[0].imageUrl}`
            : "../images/no-image.png";

        productsTable.innerHTML += `

            <tr>

                <td>

                    <img
                        src="${image}"
                        class="product-image"
                        alt="${product.name}">

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

}

// ==========================================
// Pagination
// ==========================================

function renderPagination(totalPages) {

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `

            <button onclick="changePage(${i})">

                ${i}

            </button>

        `;

    }

}

function changePage(page) {

    currentPage = page;

    loadProducts();

}

// ==========================================
// Edit Product
// ==========================================

function editProduct(id) {

    window.location.href =
        `./editProduct.html?id=${id}`;

}

// ==========================================
// Delete Product
// ==========================================

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/products/${id}`,

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

        loadProducts();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Events
// ==========================================

searchInput.addEventListener("input", () => {

    currentPage = 1;

    loadProducts();

});

categoryFilter.addEventListener("change", () => {

    currentPage = 1;

    loadProducts();

});

statusFilter.addEventListener("change", () => {

    currentPage = 1;

    loadProducts();

});

logoutBtn.addEventListener("click", (event) => {

    event.preventDefault();

    localStorage.clear();

    window.location.href = "../login.html";

});

// ==========================================
// Initialize
// ==========================================

loadCategories();

loadProducts();