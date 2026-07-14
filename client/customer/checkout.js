const token = localStorage.getItem("token");


if(!token){

    window.location.href="../login.html";

}



const ADDRESS_API = 
"http://localhost:5000/api/customer/address";


const CHECKOUT_API = 
"http://localhost:5000/api/customer/checkout";



let addressId = null;



const addressForm = document.getElementById("addressForm");

const placeOrderBtn = document.getElementById("placeOrderBtn");



// ==========================================
// Save Address
// ==========================================


addressForm.addEventListener(

"submit",

async(e)=>{


    e.preventDefault();



    try{


        const addressData={


            fullName:
            document.getElementById("fullName").value,


            mobile:
            document.getElementById("mobile").value,


            addressLine1:
            document.getElementById("addressLine1").value,


            addressLine2:
            document.getElementById("addressLine2").value,


            city:
            document.getElementById("city").value,


            state:
            document.getElementById("state").value,


            pincode:
            document.getElementById("pincode").value


        };



        const response = await fetch(

            ADDRESS_API,

            {

                method:"POST",

                headers:{


                    "Content-Type":"application/json",


                    Authorization:`Bearer ${token}`


                },


                body:JSON.stringify(addressData)

            }

        );



        const data = await response.json();



        if(!response.ok){

            throw new Error(data.message);

        }



        addressId=data.address.id;



        alert(

            "Address saved"

        );



    }

    catch(error){


        console.log(error);

        alert(error.message);


    }


});





// ==========================================
// Place Order
// ==========================================


placeOrderBtn.addEventListener(

"click",

async()=>{


    if(!addressId){


        alert(

            "Please save address first"

        );


        return;

    }




    const paymentMethod = 

    document.querySelector(

        "input[name='payment']:checked"

    ).value;




    try{


        const response = await fetch(

            CHECKOUT_API,

            {


                method:"POST",


                headers:{


                    "Content-Type":"application/json",


                    Authorization:`Bearer ${token}`


                },


                body:JSON.stringify({


                    addressId,


                    paymentMethod


                })


            }

        );



        const data = await response.json();



        if(!response.ok){


            throw new Error(data.message);


        }



        alert(

            "Order placed successfully"

        );



        window.location.href="./orders.html";



    }

    catch(error){


        console.log(error);

        alert(error.message);


    }



});