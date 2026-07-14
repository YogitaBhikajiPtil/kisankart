const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

const WISHLIST_API = "http://localhost:5000/api/customer/wishlist";
const CART_API = "http://localhost:5000/api/customer/cart";

const wishlistContainer = document.getElementById("wishlistContainer");

// ==========================================
// Load Wishlist
// ==========================================

async function loadWishlist() {

    try {

        const response = await fetch(WISHLIST_API, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        renderWishlist(data.wishlist);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Render Wishlist
// ==========================================

function renderWishlist(items) {

    wishlistContainer.innerHTML = "";

    if (items.length === 0) {

        wishlistContainer.innerHTML = `
            <h2>Your wishlist is empty.</h2>
        `;

        return;

    }

    items.forEach(item => {

        const product = item.product;

        let image = "../assets/no-image.png";

        if (product.images && product.images.length > 0) {

            image = product.images[0].imageUrl;

        } else if (product.image) {

            image = product.image;

        }

        wishlistContainer.innerHTML += `

        <div class="card">

            <img src="${image}">

            <div class="content">

                <h3>${product.name}</h3>

                <p>${product.category?.name || ""}</p>

                <p class="price">

                    ₹${product.price}/${product.unit}

                </p>

                <p>

                    Farmer : ${product.farmer?.name || ""}

                </p>

                <div class="buttons">

                    <button

                        class="cart-btn"

                        onclick="moveToCart(${item.id},${product.id})">

                        Move To Cart

                    </button>

                    <button

                        class="remove-btn"

                        onclick="removeWishlist(${item.id})">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ==========================================
// Move To Cart
// ==========================================

async function moveToCart(

    wishlistId,

    productId

) {

    try {

        await fetch(CART_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                productId,

                quantity: 1

            })

        });

        await fetch(

            `${WISHLIST_API}/${wishlistId}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        loadWishlist();

        alert("Moved to cart.");

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Remove Wishlist
// ==========================================

async function removeWishlist(id) {

    try {

        await fetch(

            `${WISHLIST_API}/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        loadWishlist();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Init
// ==========================================

loadWishlist();