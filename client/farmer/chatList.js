// ==========================================
// Authentication
// ==========================================

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (

    !token ||

    !user ||

    user.role !== "farmer"

) {

    localStorage.clear();

    window.location.href = "../login.html";

}

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000/api/chat/users";

const chatList = document.getElementById("chatList");

// ==========================================
// Load Customers
// ==========================================

async function loadChats() {

    try {

        const response = await fetch(

            API_URL,

            {

                headers: {

                    Authorization:

                    `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        chatList.innerHTML = "";

        if (!data.users.length) {

            chatList.innerHTML = `

                <h3 style="padding:20px">

                    No Chats Yet

                </h3>

            `;

            return;

        }

        data.users.forEach(customer => {

            const div = document.createElement("div");

            div.className = "chat-user";

            div.innerHTML = `

                <div>

                    <div class="user-name">

                        ${customer.name}

                    </div>

                    <div class="user-role">

                        ${customer.role}

                    </div>

                </div>

                <button>

                    Chat

                </button>

            `;

            div.onclick = () => {

                window.location.href =

                `chat.html?userId=${customer.id}`;

            };

            chatList.appendChild(div);

        });

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================================
// Init
// ==========================================

loadChats();