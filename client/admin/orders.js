const token = localStorage.getItem("token");

const API =
"http://localhost:5000/api/admin/orders";

async function loadOrders(){

const response = await fetch(

API,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await response.json();

renderOrders(data.orders);

}

function renderOrders(orders){

const tbody =
document.getElementById("ordersTable");

tbody.innerHTML="";

orders.forEach(order=>{

tbody.innerHTML+=`

<tr>

<td>${order.orderNumber}</td>

<td>${order.customer?.name}</td>

<td>${order.farmer?.name}</td>

<td>₹${order.totalAmount}</td>

<td>${order.paymentStatus}</td>

<td>${order.orderStatus}</td>

<td>

${new Date(order.createdAt)
.toLocaleDateString()}

</td>

</tr>

`;

});

}

loadOrders();