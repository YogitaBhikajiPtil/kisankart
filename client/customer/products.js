const token = localStorage.getItem("token");


if(!token){

    window.location.href="../login.html";

}



const API_URL = "http://localhost:5000/api/customer/products";

const BACKEND_URL = "http://localhost:5000";

const productContainer = document.getElementById(

    "productContainer"

);


const searchInput = document.getElementById(

    "searchInput"

);


const searchBtn = document.getElementById(

    "searchBtn"

);


const categoryFilter = document.getElementById(

    "categoryFilter"

);


const sortFilter = document.getElementById(

    "sortFilter"

);


const pagination = document.getElementById(

    "pagination"

);



let currentPage = 1;



// ==========================================
// Load Products
// ==========================================


async function loadProducts(){


try{


const params = new URLSearchParams({


    page:currentPage,

    limit:12,

    search:searchInput.value,

    category:categoryFilter.value,

    sort:sortFilter.value


});




const response = await fetch(


`${API_URL}?${params}`,

{

headers:{


Authorization:`Bearer ${token}`


}

}


);




const data = await response.json();




if(!response.ok){


throw new Error(data.message);


}




renderProducts(data.products);


renderPagination(data.totalPages);



}



catch(error){


console.error(error);


alert(error.message);


}


}





// ==========================================
// Render Products
// ==========================================


function renderProducts(products){



productContainer.innerHTML="";




if(products.length===0){


productContainer.innerHTML=`

<h2>

No Products Found

</h2>

`;


return;


}





products.forEach(product=>{


productContainer.innerHTML += `


<div class="product-card">


<img
    src="${
        product.images.length
            ? BACKEND_URL + product.images[0].imageUrl
            : "../assets/no-image.png"
    }"
    alt="${product.name}"
>



<div class="product-info">


<h3>

${product.name}

</h3>



<p>

Farmer:

${product.farmer.name}

</p>



<p class="price">

₹${product.price}

/

${product.unit}

</p>



<button

onclick="viewProduct(${product.id})">


View Product


</button>



</div>



</div>


`;



});



}




// ==========================================
// View Product
// ==========================================


function viewProduct(id){


window.location.href =

`./productDetails.html?id=${id}`;


}




// ==========================================
// Categories
// ==========================================


async function loadCategories(){



try{


const response = await fetch(

`${API_URL}/categories`,

{

headers:{


Authorization:`Bearer ${token}`


}


}


);



const data = await response.json();




data.categories.forEach(category=>{


categoryFilter.innerHTML +=`


<option value="${category.id}">

${category.name}

</option>


`;



});



}

catch(error){


console.error(error);


}



}





// ==========================================
// Pagination
// ==========================================


function renderPagination(totalPages){



pagination.innerHTML="";



for(let i=1;i<=totalPages;i++){


pagination.innerHTML +=`


<button onclick="changePage(${i})">


${i}


</button>


`;



}


}




function changePage(page){


currentPage=page;


loadProducts();


}




// ==========================================
// Events
// ==========================================


searchBtn.addEventListener(

"click",

()=>{


currentPage=1;

loadProducts();


}

);




searchInput.addEventListener(

"keyup",

(e)=>{


if(e.key==="Enter"){


currentPage=1;

loadProducts();


}


}

);




categoryFilter.addEventListener(

"change",

()=>{


currentPage=1;

loadProducts();


}

);




sortFilter.addEventListener(

"change",

()=>{


currentPage=1;

loadProducts();


}

);




// ==========================================
// Init
// ==========================================


async function init(){


await loadCategories();


await loadProducts();


}


init();