const token = localStorage.getItem("token");


if(!token){

    window.location.href="../login.html";

}



const API = 
"http://localhost:5000/api/customer/orders";


const ordersContainer = 
document.getElementById("ordersContainer");



// ==========================================
// Load Orders
// ==========================================

async function loadOrders(){


    try{


        const response = await fetch(

            API,

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



        renderOrders(data.orders);


    }


    catch(error){

        console.log(error);

        ordersContainer.innerHTML = `

            <h3>
                ${error.message}
            </h3>

        `;

    }


}





// ==========================================
// Render Orders
// ==========================================

function renderOrders(orders){


    ordersContainer.innerHTML="";



    if(orders.length===0){


        ordersContainer.innerHTML=`

            <h2>
                No orders found
            </h2>

        `;


        return;

    }




    orders.forEach(order=>{



        let productsHTML="";



        order.items.forEach(item=>{


            let image = 
            "../assets/no-image.png";



            if(

                item.product.images &&

                item.product.images.length>0

            ){

                image = 
                item.product.images[0].imageUrl;

            }



            productsHTML += `


            <div class="product">


                <img src="${image}">


                <div>

                    <h4>
                    ${item.product.name}
                    </h4>


                    <p>
                    Quantity: ${item.quantity}
                    </p>


                    <p>
                    ₹${item.totalPrice}
                    </p>


                </div>


            </div>


            `;


        });





        let historyHTML="";



        if(order.statusHistory){


            order.statusHistory.forEach(status=>{


                historyHTML += `


                <p>

                <b>${status.status}</b>

                <br>

                ${status.remarks || ""}

                <br>

                ${new Date(
                    status.createdAt
                ).toLocaleString()}

                </p>


                `;


            });


        }





        ordersContainer.innerHTML += `


        <div class="order-card">


            <div class="order-header">


                <div>


                    <h3>

                    Order #${order.orderNumber}

                    </h3>


                    <p>

                    Farmer:
                    ${order.farmer?.name || "N/A"}

                    </p>


                </div>



                <span class="status">

                ${order.orderStatus}

                </span>



            </div>



            ${productsHTML}



            <p>

            Payment:
            ${order.paymentStatus}

            (${order.paymentMethod})

            </p>



            <p class="total">

            Total:
            ₹${order.totalAmount}

            </p>



            <div class="history">


                <h3>
                Tracking History
                </h3>


                ${historyHTML || "No updates yet"}


            </div>



        </div>


        `;



    });


}




loadOrders();