// ==========================================
// KisanKart - Edit Product
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
// API
// ==========================================

const API_URL = "http://localhost:5000/api";

// ==========================================
// Product Id
// ==========================================

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// ==========================================
// DOM
// ==========================================

const form = document.getElementById("editProductForm");

const categorySelect = document.getElementById("categoryId");

const imagePreview = document.getElementById("imagePreview");

const imageInput = document.getElementById("images");

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

            categorySelect.innerHTML += `

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
// Load Product
// ==========================================

async function loadProduct() {

    try {

        const response = await fetch(

            `${API_URL}/products/${productId}`,

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

        const product = data.product;

        document.getElementById("name").value =
            product.name;

        document.getElementById("description").value =
            product.description;

        document.getElementById("price").value =
            product.price;

        document.getElementById("quantity").value =
            product.inventory.availableQuantity;

        document.getElementById("unit").value =
            product.inventory.unit;

        document.getElementById("status").value =
            product.status;

        document.getElementById("harvestDate").value =
            product.harvestDate
                ? product.harvestDate.split("T")[0]
                : "";

        document.getElementById("expiryDate").value =
            product.expiryDate
                ? product.expiryDate.split("T")[0]
                : "";

        document.getElementById("lowStockThreshold").value =
            product.inventory.lowStockThreshold;

        document.getElementById("isOrganic").checked =
            product.isOrganic;

        categorySelect.value =
            product.categoryId;

        imagePreview.innerHTML = "";

        product.images.forEach(image => {

            imagePreview.innerHTML += `

                <div class="image-card">

                    <img
                        src="http://localhost:5000${image.imageUrl}"
                        alt="Product">

                    <button
                        type="button"
                        class="remove-image"
                        onclick="deleteImage(${image.id})">

                        ×

                    </button>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Update Product
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData();

    formData.append(
        "name",
        document.getElementById("name").value
    );

    formData.append(
        "categoryId",
        categorySelect.value
    );

    formData.append(
        "description",
        document.getElementById("description").value
    );

    formData.append(
        "price",
        document.getElementById("price").value
    );

    formData.append(
        "status",
        document.getElementById("status").value
    );

    formData.append(
        "harvestDate",
        document.getElementById("harvestDate").value
    );

    formData.append(
        "expiryDate",
        document.getElementById("expiryDate").value
    );

    formData.append(
        "isOrganic",
        document.getElementById("isOrganic").checked
    );

    formData.append(
        "availableQuantity",
        document.getElementById("quantity").value
    );

    formData.append(
        "lowStockThreshold",
        document.getElementById("lowStockThreshold").value
    );

    formData.append(
        "unit",
        document.getElementById("unit").value
    );

    for (let i = 0; i < imageInput.files.length; i++) {

        formData.append(
            "images",
            imageInput.files[i]
        );

    }

    try {

        const response = await fetch(

            `${API_URL}/products/${productId}`,

            {

                method: "PUT",

                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: formData

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert("Product updated successfully.");

        window.location.href =
            "./myProducts.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});

// ==========================================
// Delete Product Image
// ==========================================

async function deleteImage(imageId) {

    if (!confirm("Delete this image?")) {

        return;

    }

    try {

        const response = await fetch(

            `${API_URL}/products/images/${imageId}`,

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

        loadProduct();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================================
// Initialize
// ==========================================

async function init() {

    await loadCategories();

    await loadProduct();

}

init();