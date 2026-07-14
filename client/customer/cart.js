const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const API_URL = "http://localhost:5000/api/customer/cart";

const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const totalAmount = document.getElementById("totalAmount");

const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

// ==========================================
// Load Cart
// ==========================================

async function loadCart() {

    try {

        const response = await fetch(API_URL, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        renderCart(data.cart);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Render Cart
// ==========================================

function renderCart(cart) {

    cartItems.innerHTML = "";

    totalItems.textContent = cart.items.length;

    totalAmount.textContent = cart.total;

    if (cart.items.length === 0) {

        cartItems.innerHTML = "<h2>Your cart is empty.</h2>";

        return;

    }

    cart.items.forEach(item => {

        const image =
            item.product.images.length
                ? item.product.images[0].imageUrl
                : "../assets/no-image.png";

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${image}" alt="${item.product.name}">

            <div class="item-details">

                <h3>${item.product.name}</h3>

                <p>₹${item.product.price}</p>

                <p>Subtotal: ₹${item.product.price * item.quantity}</p>

                <div class="quantity">

                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

}

// ==========================================
// Update Quantity
// ==========================================

async function updateQuantity(cartItemId, quantity) {

    if (quantity < 1) return;

    try {

        await fetch(`${API_URL}/${cartItemId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                quantity

            })

        });

        loadCart();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Remove Item
// ==========================================

async function removeItem(cartItemId) {

    if (!confirm("Remove this product?")) return;

    try {

        await fetch(`${API_URL}/${cartItemId}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        loadCart();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Clear Cart
// ==========================================

clearCartBtn.addEventListener("click", async () => {

    if (!confirm("Clear your cart?")) return;

    try {

        await fetch(API_URL, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        loadCart();

    }

    catch (error) {

        console.error(error);

    }

});

// ==========================================
// Checkout
// ==========================================

checkoutBtn.addEventListener("click", () => {

    window.location.href = "./checkout.html";

});

// ==========================================
// Init
// ==========================================

loadCart();