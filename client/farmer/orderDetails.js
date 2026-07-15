// ==========================================
// Authentication
// ==========================================

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || user.role !== "farmer") {

    localStorage.clear();

    window.location.href = "../login.html";

}

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000/api/farmer/orders";

const orderId = new URLSearchParams(

    window.location.search

).get("id");

// ==========================================
// DOM
// ==========================================

const orderInfo = document.getElementById("orderInfo");

const customerInfo = document.getElementById("customerInfo");

const addressInfo = document.getElementById("addressInfo");

const paymentInfo = document.getElementById("paymentInfo");

const productTable = document.getElementById("productTable");

const timeline = document.getElementById("timeline");

const status = document.getElementById("status");

const remarks = document.getElementById("remarks");

const updateBtn = document.getElementById("updateBtn");

const backBtn = document.getElementById("backBtn");

const chatBtn = document.getElementById("chatBtn");
// ==========================================
// Load Order
// ==========================================

async function loadOrder() {

    try {

        const response = await fetch(

            `${API_URL}/${orderId}`,

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

        renderOrder(data.order);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Render
// ==========================================

function renderOrder(order) {

    orderInfo.innerHTML = `

        <div class="info-row">

            <div class="info-title">

                Order Number

            </div>

            <div class="info-value">

                ${order.orderNumber}

            </div>

        </div>

        <div class="info-row">

            <div class="info-title">

                Status

            </div>

            <div class="info-value">

                ${order.orderStatus}

            </div>

        </div>

        <div class="info-row">

            <div class="info-title">

                Total

            </div>

            <div class="info-value">

                ₹${order.totalAmount}

            </div>

        </div>

    `;

    customerInfo.innerHTML = `

        <div class="info-row">

            <div class="info-title">

                Name

            </div>

            <div class="info-value">

                ${order.customer.name}

            </div>

        </div>

        <div class="info-row">

            <div class="info-title">

                Email

            </div>

            <div class="info-value">

                ${order.customer.email}

            </div>

        </div>

    `;

    addressInfo.innerHTML = `

        <p>

            ${order.address.fullName}

        </p>

        <p>

            ${order.address.mobile}

        </p>

        <p>

            ${order.address.addressLine1}

        </p>

        <p>

            ${order.address.city},

            ${order.address.state}

        </p>

        <p>

            ${order.address.pincode}

        </p>

    `;

    paymentInfo.innerHTML = `

        <div class="info-row">

            <div class="info-title">

                Method

            </div>

            <div class="info-value">

                ${order.payment.paymentMethod}

            </div>

        </div>

        <div class="info-row">

            <div class="info-title">

                Status

            </div>

            <div class="info-value">

                ${order.payment.paymentStatus}

            </div>

        </div>

    `;

    productTable.innerHTML = "";

    order.items.forEach(item => {

        productTable.innerHTML += `

            <tr>

                <td>

                    <img

                        src="${item.product.images.length ? 'http://localhost:5000/' + item.product.images[0].imageUrl : '../assets/no-image.png'}"

                        class="product-image">

                </td>

                <td>

                    ${item.product.name}

                </td>

                <td>

                    ${item.quantity}

                </td>

                <td>

                    ₹${item.unitPrice}

                </td>

                <td>

                    ₹${item.totalPrice}

                </td>

            </tr>

        `;

        

    });

    timeline.innerHTML = "";

    order.statusHistory.forEach(history => {

        timeline.innerHTML += `

            <div class="timeline-item">

                <h4>

                    ${history.status}

                </h4>

                <p>

                    ${history.remarks || ""}

                </p>

                <small>

                    ${new Date(history.createdAt).toLocaleString()}

                </small>

            </div>

        `;

    });

    status.value = order.orderStatus;

   chatBtn.onclick = () => {

    window.location.href =

    `./chat.html?userId=${order.customer.id}`;

};
}

// ==========================================
// Update Status
// ==========================================

updateBtn.addEventListener(

    "click",

    async () => {

        try {

            const response = await fetch(

                `${API_URL}/${orderId}/status`,

                {

                    method: "PATCH",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        status: status.value,

                        remarks: remarks.value

                    })

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            alert(data.message);

            loadOrder();

        }

        catch (error) {

            console.error(error);

            alert(error.message);

        }

    }

);

// ==========================================
// Back
// ==========================================

backBtn.addEventListener(

    "click",

    () => {

        window.location.href = "./orders.html";

    }

);

// ==========================================
// Init
// ==========================================

loadOrder();