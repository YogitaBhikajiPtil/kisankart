const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (

    !token ||

    !user ||

    user.role !== "delivery"

){

    localStorage.clear();

    location.href="../login.html";

}

const API="http://localhost:5000/api/delivery";

const availableCount=document.getElementById("availableCount");

const assignedCount=document.getElementById("assignedCount");

const deliveredCount=document.getElementById("deliveredCount");

async function loadDashboard(){

    try{

        const available=await fetch(

            `${API}/available`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const availableData=await available.json();

        availableCount.textContent=availableData.orders.length;

        const mine=await fetch(

            `${API}/my`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const myData=await mine.json();

        assignedCount.textContent=

        myData.orders.filter(

            order=>order.orderStatus!=="Delivered"

        ).length;

        deliveredCount.textContent=

        myData.orders.filter(

            order=>order.orderStatus==="Delivered"

        ).length;

    }

    catch(error){

        console.log(error);

    }

}

document

.getElementById("logoutBtn")

.addEventListener(

    "click",

    event=>{

        event.preventDefault();

        localStorage.clear();

        location.href="../login.html";

    }

);

loadDashboard();