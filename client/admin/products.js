const token = localStorage.getItem("token");

const API =
"http://localhost:5000/api/admin/products";

async function loadProducts(){

const res = await fetch(

API,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await res.json();

renderProducts(data.products);

}

function renderProducts(products){

const tbody =
document.getElementById("productsTable");

tbody.innerHTML="";

products.forEach(product=>{

let image="";

if(product.images &&
product.images.length){

image=product.images[0].imageUrl;

}

tbody.innerHTML+=`

<tr>

<td>${product.id}</td>

<td>

<img src="${image}">

</td>

<td>${product.name}</td>

<td>${product.farmer.name}</td>

<td>₹${product.price}</td>

<td>${product.status}</td>

<td>

<button onclick="changeStatus(

${product.id},

'Hidden'

)">

Hide

</button>

<button onclick="changeStatus(

${product.id},

'Available'

)">

Show

</button>

<button onclick="deleteProduct(

${product.id}

)">

Delete

</button>

</td>

</tr>

`;

});

}

async function changeStatus(

id,

status

){

await fetch(

API+"/"+id+"/status",

{

method:"PUT",

headers:{

Authorization:`Bearer ${token}`,

"Content-Type":"application/json"

},

body:JSON.stringify({

status

})

}

);

loadProducts();

}

async function deleteProduct(id){

if(!confirm("Delete Product?")){

return;

}

await fetch(

API+"/"+id,

{

method:"DELETE",

headers:{

Authorization:`Bearer ${token}`

}

}

);

loadProducts();

}

loadProducts();