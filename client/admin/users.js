const token = localStorage.getItem("token");

const API =
"http://localhost:5000/api/admin/users";

async function loadUsers(){

const res = await fetch(

API,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

const data = await res.json();

renderUsers(data.users);

}

function renderUsers(users){

const tbody =
document.getElementById("usersTable");

tbody.innerHTML="";

users.forEach(user=>{

tbody.innerHTML +=`

<tr>

<td>${user.id}</td>

<td>${user.name}</td>

<td>${user.email}</td>

<td>${user.role}</td>

<td>

${user.isActive?"Active":"Blocked"}

</td>

<td>

<button onclick="toggleStatus(${user.id},${user.isActive})">

${user.isActive?"Block":"Activate"}

</button>

</td>

</tr>

`;

});

}

async function toggleStatus(

id,

status

){

await fetch(

API+"/"+id+"/status",

{

method:"PUT",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify({

isActive:!status

})

}

);

loadUsers();

}

loadUsers();