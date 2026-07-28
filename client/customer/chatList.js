const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if(!token || !user){

    window.location.href="../login.html";

}

const API_URL="http://localhost:5000/api/chat/users";

const chatList=document.getElementById("chatList");

async function loadChats(){

    try{

        const response=await fetch(

            API_URL,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data=await response.json();

        chatList.innerHTML="";

        if(data.users.length===0){

            chatList.innerHTML="<h3 style='padding:20px'>No Chats Found</h3>";

            return;

        }

        data.users.forEach(user=>{

            const div=document.createElement("div");

            div.className="chat-user";

            div.innerHTML=`

                <div>

                    <div class="user-name">

                        ${user.name}

                    </div>

                    <div class="user-role">

                        ${user.role}

                    </div>

                </div>

                <button>

                    Chat

                </button>

            `;

            div.onclick=()=>{

                window.location.href=

                `chat.html?userId=${user.id}`;

            };

            chatList.appendChild(div);

        });

    }

    catch(err){

        console.log(err);

    }

}

loadChats();