// ==========================================
// KisanKart - Inventory
// ==========================================

// Authentication

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {

    window.location.href = "../login.html";

}

if (user.role !== "farmer") {

    localStorage.clear();

    window.location.href = "../login.html";

}

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000/api";

// ==========================================
// DOM
// ==========================================

const totalProducts = document.getElementById("totalProducts");

const totalStock = document.getElementById("totalStock");

const lowStock = document.getElementById("lowStock");

const outOfStock = document.getElementById("outOfStock");

const inventoryTable = document.getElementById("inventoryTable");

const categoryFilter = document.getElementById("categoryFilter");

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

        const response = await fetch(

            `${API_URL}/categories`

        );

        const data = await response.json();

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
// Load Inventory
// ==========================================

async function loadInventory() {

    try {

        const params = new URLSearchParams({

            page: currentPage,

            limit,

            keyword: searchInput.value,

            categoryId: categoryFilter.value

        });

        const response = await fetch(

            `${API_URL}/inventory?${params.toString()}`,

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

        renderSummary(data.summary);

        renderInventory(data.inventory);

        renderPagination(data.totalPages);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Summary
// ==========================================

function renderSummary(summary) {

    totalProducts.textContent =
        summary.totalProducts;

    totalStock.textContent =
        summary.totalStock;

    lowStock.textContent =
        summary.lowStock;

    outOfStock.textContent =
        summary.outOfStock;

}

// ==========================================
// Inventory Table
// ==========================================

function renderInventory(items) {

    inventoryTable.innerHTML = "";

    if (!items.length) {

        inventoryTable.innerHTML = `

            <tr>

                <td colspan="8">

                    No inventory found.

                </td>

            </tr>

        `;

        return;

    }

    items.forEach(item => {

        inventoryTable.innerHTML += `

            <tr>

                <td>

                    ${item.product.name}

                </td>

                <td>

                    ${item.product.category.name}

                </td>

                <td>

                    ${item.availableQuantity}

                </td>

                <td>

                    ${item.totalQuantity}

                </td>

                <td>

                    ${item.reservedQuantity}

                </td>

                <td>

                    ${item.lowStockThreshold}

                </td>

                <td>

                    ${item.unit}

                </td>

                <td>

                    <button

                        class="action-btn stock-in"

                        onclick="stockIn(${item.id})">

                        Stock In

                    </button>

                    <button

                        class="action-btn stock-out"

                        onclick="stockOut(${item.id})">

                        Stock Out

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

    for (let page = 1; page <= totalPages; page++) {

        pagination.innerHTML += `

            <button

                onclick="changePage(${page})">

                ${page}

            </button>

        `;

    }

}

function changePage(page) {

    currentPage = page;

    loadInventory();

}

// ==========================================
// Stock In
// ==========================================

async function stockIn(id) {

    const quantity = prompt("Enter stock quantity");

    if (!quantity) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/inventory/${id}/stock-in`,

            {

                method: "PATCH",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    quantity

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert(data.message);

        loadInventory();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Stock Out
// ==========================================

async function stockOut(id) {

    const quantity = prompt("Enter stock quantity");

    if (!quantity) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/inventory/${id}/stock-out`,

            {

                method: "PATCH",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    quantity

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert(data.message);

        loadInventory();

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

    loadInventory();

});

categoryFilter.addEventListener("change", () => {

    currentPage = 1;

    loadInventory();

});

logoutBtn.addEventListener("click", event => {

    event.preventDefault();

    localStorage.clear();

    window.location.href = "../login.html";

});

// ==========================================
// Initialize
// ==========================================

async function init() {

    await loadCategories();

    await loadInventory();

}

init();