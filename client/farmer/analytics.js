const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "../login.html";

}

const API_URL = "http://localhost:5000/api/farmer/analytics";

const totalOrders = document.getElementById("totalOrders");

const totalRevenue = document.getElementById("totalRevenue");

const todayRevenue = document.getElementById("todayRevenue");

const monthlyRevenue = document.getElementById("monthlyRevenue");

const topProducts = document.getElementById("topProducts");

const recentOrders = document.getElementById("recentOrders");

async function loadAnalytics() {

    try {

        const response = await fetch(

            API_URL,

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

        renderDashboard(

            data.analytics

        );

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

function renderDashboard(data) {

    totalOrders.textContent = data.totalOrders;

    totalRevenue.textContent =

        "₹" + data.totalRevenue;

    todayRevenue.textContent =

        "₹" + data.todayRevenue;

    monthlyRevenue.textContent =

        "₹" + data.monthlyRevenue;

    topProducts.innerHTML = "";

    data.topProducts.forEach(item => {

        topProducts.innerHTML += `

            <tr>

                <td>

                    ${item.product.name}

                </td>

                <td>

                    ${item.dataValues.soldQuantity}

                </td>

            </tr>

        `;

    });

    recentOrders.innerHTML = "";

    data.recentOrders.forEach(order => {

        recentOrders.innerHTML += `

            <tr>

                <td>

                    ${order.orderNumber}

                </td>

                <td>

                    ${order.orderStatus}

                </td>

                <td>

                    ₹${order.totalAmount}

                </td>

            </tr>

        `;

    });

    createChart(data);

}

function createChart(data) {

    new Chart(

        document.getElementById(

            "salesChart"

        ),

        {

            type: "bar",

            data: {

                labels: [

                    "Today",

                    "Month",

                    "Total"

                ],

                datasets: [

                    {

                        label: "Revenue",

                        data: [

                            data.todayRevenue,

                            data.monthlyRevenue,

                            data.totalRevenue

                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {

                        display: false

                    }

                }

            }

        }

    );

}

loadAnalytics();