const token=localStorage.getItem("token");

const user=JSON.parse(localStorage.getItem("user"));

if(!token||!user||user.role!=="delivery"){

location.href="../login.html";

}

const API="http://localhost:5000/api/delivery";

const table=document.getElementById("ordersTable");

async function loadOrders(){

const response=await fetch(

`${API}/available`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data=await response.json();

table.innerHTML="";

data.orders.forEach(order=>{

table.innerHTML+=`

<tr>

<td>${order.orderNumber}</td>

<td>${order.customer.name}</td>

<td>

${order.address.city},

${order.address.state}

</td>

<td>

₹${order.totalAmount}

</td>

<td>

<button

onclick="acceptOrder(${order.id})">

Accept

</button>

</td>

</tr>

`;

});

}

async function acceptOrder(id){

const response=await fetch(

`${API}/${id}/accept`,

{

method:"PATCH",

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data=await response.json();

alert(data.message);

loadOrders();

}

loadOrders();