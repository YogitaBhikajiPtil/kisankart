// ==========================================
// Authentication
// ==========================================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../login.html";
}

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000/api/customer/products";
const CART_API = "http://localhost:5000/api/customer/cart";
const WISHLIST_API = "http://localhost:5000/api/customer/wishlist";
const BACKEND_URL = "http://localhost:5000";

const productId = new URLSearchParams(window.location.search).get("id");

// ==========================================
// DOM
// ==========================================

const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const farmerName = document.getElementById("farmerName");
const farmerPhone = document.getElementById("farmerPhone");

const stock = document.getElementById("stock");

const quantityInput = document.getElementById("quantity");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

const cartBtn = document.getElementById("cartBtn");
const wishlistBtn = document.getElementById("wishlistBtn");
const buyBtn = document.getElementById("buyBtn");

const reviewContainer = document.getElementById("reviewContainer");

// ==========================================
// Load Product
// ==========================================

async function loadProduct() {

    try {

        const response = await fetch(

            `${API_URL}/${productId}`,

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

        renderProduct(data.product);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Render Product
// ==========================================

function renderProduct(product) {

    productName.textContent = product.name;

    productPrice.textContent = `₹${product.price}`;

    productDescription.textContent = product.description;

    farmerName.textContent = `Farmer : ${product.farmer.name}`;

    farmerPhone.textContent = `Phone : ${product.farmer.phone}`;

    stock.textContent = `${product.stock} Available`;

    // Images

    if (product.images.length > 0) {

    mainImage.src = BACKEND_URL + product.images[0].imageUrl;

} else {

    mainImage.src = "../assets/no-image.png";

}
    thumbnailContainer.innerHTML = "";

    product.images.forEach(image => {

        thumbnailContainer.innerHTML += `

            <img

               src="${BACKEND_URL + image.imageUrl}"

                class="thumbnail"

                onclick="changeImage('${BACKEND_URL + image.imageUrl}')">

        `;

    });

    // Reviews

    reviewContainer.innerHTML = "";

    if (product.reviews.length === 0) {

        reviewContainer.innerHTML = "<p>No Reviews Yet.</p>";

    }

    product.reviews.forEach(review => {

        reviewContainer.innerHTML += `

            <div class="review-card">

                <h4>${review.rating} ⭐</h4>

                <p>${review.comment}</p>

            </div>

        `;

    });

}

// ==========================================
// Image Preview
// ==========================================

function changeImage(url) {

    mainImage.src = url;

}

// ==========================================
// Quantity
// ==========================================

plusBtn.addEventListener("click", () => {

    quantityInput.value = Number(quantityInput.value) + 1;

});

minusBtn.addEventListener("click", () => {

    if (Number(quantityInput.value) > 1) {

        quantityInput.value = Number(quantityInput.value) - 1;

    }

});

// ==========================================
// Add To Cart
// ==========================================

cartBtn.addEventListener(

    "click",

    async () => {

        try {

            const response = await fetch(

                CART_API,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        productId,

                        quantity: Number(quantityInput.value)

                    })

                }

            );

            const data = await response.json();

            alert(data.message);

        }

        catch (error) {

            console.error(error);

        }

    }

);

// ==========================================
// Wishlist
// ==========================================

wishlistBtn.addEventListener(

    "click",

    async () => {

        try {

            const response = await fetch(

                WISHLIST_API,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        productId

                    })

                }

            );

            const data = await response.json();

            alert(data.message);

        }

        catch (error) {

            console.error(error);

        }

    }

);

// ==========================================
// Buy Now
// ==========================================

buyBtn.addEventListener(

    "click",

    () => {

        localStorage.setItem(

            "buyNow",

            JSON.stringify({

                productId,

                quantity: Number(quantityInput.value)

            })

        );

        window.location.href = "./checkout.html";

    }

);

// ==========================================
// Init
// ==========================================

loadProduct();