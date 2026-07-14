const token = localStorage.getItem("token");

if(!token){

    window.location.href="../login.html";

}


const API_URL = "http://localhost:5000/api/farmer/profile";


const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const phoneInput = document.getElementById("phone");

const imageInput = document.getElementById("image");

const profileImage = document.getElementById("profileImage");

const updateBtn = document.getElementById("updateBtn");



// ==========================================
// Load Profile
// ==========================================

async function loadProfile(){


    try{


        const response = await fetch(

            API_URL,

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



        const user = data.profile;



        nameInput.value = user.name || "";

        emailInput.value = user.email || "";

        phoneInput.value = user.phone || "";



        if(user.profileImage){

            profileImage.src = user.profileImage;

            imageInput.value = user.profileImage;

        }


    }


    catch(error){

        console.error(error);

        alert(error.message);

    }


}




// ==========================================
// Update Profile
// ==========================================


updateBtn.addEventListener(

"click",

async()=>{


    try{


        const response = await fetch(

            API_URL,

            {

                method:"PUT",

                headers:{


                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`


                },


                body:JSON.stringify({


                    name:nameInput.value,

                    phone:phoneInput.value,

                    profileImage:imageInput.value


                })


            }

        );



        const data = await response.json();



        if(!response.ok){

            throw new Error(data.message);

        }



        alert(

            "Profile updated successfully"

        );


        loadProfile();


    }


    catch(error){


        console.error(error);

        alert(error.message);


    }


});




// ==========================================
// Image Preview
// ==========================================

imageInput.addEventListener(

"change",

()=>{


    if(imageInput.value){


        profileImage.src = imageInput.value;


    }


});




// Initialize

loadProfile();