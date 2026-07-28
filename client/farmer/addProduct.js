// ==========================================
// KisanKart - Add Product
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

const form = document.getElementById("addProductForm");

const categorySelect = document.getElementById("categoryId");

const imageInput = document.getElementById("images");

// ==========================================
// Load Categories
// ==========================================

async function loadCategories() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/categories"
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        categorySelect.innerHTML =
            `<option value="">Select Category</option>`;

        data.categories.forEach(category => {

            categorySelect.innerHTML += `

                <option value="${category.id}">

                    ${category.name}

                </option>

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

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const formData = new FormData();

    formData.append(
        "categoryId",
        categorySelect.value
    );

    formData.append(
        "name",
        document.getElementById("name").value
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
        "totalQuantity",
        document.getElementById("quantity").value
    );

    formData.append(
        "unit",
        document.getElementById("unit").value
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
        "lowStockThreshold",
        document.getElementById("lowStockThreshold").value
    );

    formData.append(
        "status",
        document.getElementById("status").value
    );

    formData.append(
        "isOrganic",
        document.getElementById("isOrganic").checked
    );

    // Images

    for (let i = 0; i < imageInput.files.length; i++) {

        formData.append(
            "images",
            imageInput.files[i]
        );

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/products",

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: formData

            }

        );

        const data = await response.json();

        console.log(data);

if (!response.ok) {
    alert(JSON.stringify(data.errors));
    return;
}

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert("Product added successfully.");

        form.reset();

        window.location.href = "./dashboard.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});

// ==========================================
// Initialize
// ==========================================

loadCategories();