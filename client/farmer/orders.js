// ==========================================
// Authentication
// ==========================================

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

const API_URL = "http://localhost:5000/api/farmer/orders";

// ==========================================
// DOM
// ==========================================

const pendingOrders = document.getElementById("pendingOrders");

const acceptedOrders = document.getElementById("acceptedOrders");

const packedOrders = document.getElementById("packedOrders");

const deliveredOrders = document.getElementById("deliveredOrders");

const ordersTable = document.getElementById("ordersTable");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const pagination = document.getElementById("pagination");

const logoutBtn = document.getElementById("logoutBtn");

// ==========================================
// State
// ==========================================

let currentPage = 1;

const limit = 10;

// ==========================================
// Dashboard
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(

            `${API_URL}/dashboard`,

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

        pendingOrders.textContent = data.dashboard.pending;

        acceptedOrders.textContent = data.dashboard.accepted;

        packedOrders.textContent = data.dashboard.packed;

        deliveredOrders.textContent = data.dashboard.delivered;

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// Load Orders
// ==========================================

async function loadOrders() {

    try {

        const params = new URLSearchParams({

            page: currentPage,

            limit,

            keyword: searchInput.value,

            status: statusFilter.value

        });

        const response = await fetch(

            `${API_URL}?${params.toString()}`,

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

        renderOrders(data.orders);

        renderPagination(data.totalPages);

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// Render Orders
// ==========================================

function getStatusClass(status) {

    switch (status) {

        case "Pending":

            return "pending";

        case "Accepted":

            return "accepted";

        case "Packed":

            return "packed";

        case "Ready For Pickup":

            return "ready";

        case "Out For Delivery":

            return "delivery";

        case "Delivered":

            return "delivered";

        case "Cancelled":

            return "cancelled";

        default:

            return "";

    }

}

function renderOrders(orders) {

    ordersTable.innerHTML = "";

    if (!orders.length) {

        ordersTable.innerHTML = `

            <tr>

                <td colspan="7">

                    No Orders Found

                </td>

            </tr>

        `;

        return;

    }

    orders.forEach(order => {

        const date = new Date(

            order.createdAt

        ).toLocaleDateString();

        ordersTable.innerHTML += `

            <tr>

                <td>${order.orderNumber}</td>

                <td>${order.customer.name}</td>

                <td>₹${order.totalAmount}</td>

                <td>${order.paymentStatus}</td>

                <td>

                    <span class="status ${getStatusClass(order.orderStatus)}">

                        ${order.orderStatus}

                    </span>

                </td>

                <td>${date}</td>

                <td>

                    <button

                        class="action-btn"

                        onclick="viewOrder(${order.id})">

                        View

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

    if (totalPages <= 1) {

        return;

    }

    for (

        let page = 1;

        page <= totalPages;

        page++

    ) {

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

    loadOrders();

}

// ==========================================
// View Order
// ==========================================

function viewOrder(id) {

    window.location.href =

        `./orderDetails.html?id=${id}`;

}

// ==========================================
// Update Status
// ==========================================

async function updateStatus(

    orderId,

    status,

    remarks = ""

) {

    try {

        const response = await fetch(

            `${API_URL}/${orderId}/status`,

            {

                method: "PATCH",

                headers: {

                    "Content-Type":

                        "application/json",

                    Authorization:

                        `Bearer ${token}`

                },

                body: JSON.stringify({

                    status,

                    remarks

                })

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert(data.message);

        loadDashboard();

        loadOrders();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Events
// ==========================================

searchInput.addEventListener(

    "input",

    () => {

        currentPage = 1;

        loadOrders();

    }

);

statusFilter.addEventListener(

    "change",

    () => {

        currentPage = 1;

        loadOrders();

    }

);

logoutBtn.addEventListener(

    "click",

    event => {

        event.preventDefault();

        localStorage.clear();

        window.location.href = "../login.html";

    }

);

// ==========================================
// Initialize
// ==========================================

async function init() {

    await loadDashboard();

    await loadOrders();

}

init();