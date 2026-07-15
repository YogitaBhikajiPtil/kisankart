const token = localStorage.getItem("token");

async function loadDashboard() {

    const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    const d = data.dashboard;

    document.getElementById("customers").textContent =
        d.totalCustomers;

    document.getElementById("farmers").textContent =
        d.totalFarmers;

    document.getElementById("delivery").textContent =
        d.totalDeliveryPartners;

    document.getElementById("products").textContent =
        d.totalProducts;

    document.getElementById("orders").textContent =
        d.totalOrders;

    document.getElementById("revenue").textContent =
        "₹"+d.totalRevenue;
}

loadDashboard();

document
.getElementById("logoutBtn")
.onclick=()=>{

    localStorage.clear();

    location.href="../login.html";

}