const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user || user.role !== "delivery") {

    localStorage.clear();

    location.href = "../login.html";

}

const API = "http://localhost:5000/api/delivery";

const table = document.getElementById("deliveryTable");

async function loadDeliveries() {

    try {

        const response = await fetch(

            `${API}/my`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        table.innerHTML = "";

        data.orders.forEach(order => {

            table.innerHTML += `

            <tr>

                <td>${order.orderNumber}</td>

                <td>${order.customer.name}</td>

                <td>

                    ${order.address.city},

                    ${order.address.state}

                </td>

                <td>

                    <span class="status ${order.orderStatus==="Delivered"?"delivered":"out"}">

                        ${order.orderStatus}

                    </span>

                </td>

                <td>

                ${
                    order.orderStatus==="Delivered"

                    ?

                    "Completed"

                    :

                    `<button onclick="markDelivered(${order.id})">

                    Mark Delivered

                    </button>`
                }

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

async function markDelivered(id){

    try{

        const response=await fetch(

            `${API}/${id}/delivered`,

            {

                method:"PATCH",

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data=await response.json();

        alert(data.message);

        loadDeliveries();

    }

    catch(error){

        console.log(error);

    }

}

loadDeliveries();