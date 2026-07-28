// ==========================================
// Authentication
// ==========================================

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {

    window.location.href = "../login.html";

}

// ==========================================
// Socket
// ==========================================

const socket = io("http://localhost:5000");

socket.emit("join", user.id);

// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:5000/api/chat";

// ==========================================
// DOM
// ==========================================

const messages = document.getElementById("messages");

const messageInput = document.getElementById("message");

const sendBtn = document.getElementById("sendBtn");

const chatUsers = document.getElementById("chatUsers");

const chatName = document.getElementById("chatName");

// ==========================================
// Receiver
// ==========================================

let receiverId = new URLSearchParams(

    window.location.search

).get("userId");

const selectedChat = JSON.parse(

    localStorage.getItem("selectedChat")

);

if (

    selectedChat &&

    selectedChat.id == receiverId

) {

    chatName.textContent = selectedChat.name;

}
// ==========================================
// Load Chat Users
// ==========================================

async function loadChatUsers() {

    try {

        const response = await fetch(

            `${API_URL}/users`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        chatUsers.innerHTML = "";

       data.users.forEach(chat => {

    const active =

        chat.id == receiverId

            ? "active"

            : "";

    chatUsers.innerHTML += `

        <div

            class="chat-user ${active}"

            onclick="openChat(${chat.id}, '${chat.name}')">

            <h4>${chat.name}</h4>

            <small>${chat.lastMessage || ""}</small>

            ${chat.unread > 0
                ? `<span class="badge">${chat.unread}</span>`
                : ""
            }

        </div>

    `;

});

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================================
// Open Chat
// ==========================================

function openChat(id, name) {

    receiverId = id;

    chatName.textContent = name;

    localStorage.setItem(

        "selectedChat",

        JSON.stringify({

            id,

            name

        })

    );

    history.replaceState(

        null,

        "",

        `?userId=${id}`

    );

    loadMessages();

}

window.openChat = openChat;

// ==========================================
// Load Messages
// ==========================================

async function loadMessages() {

    if (!receiverId) return;

    try {

        const response = await fetch(

            `${API_URL}/${receiverId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        messages.innerHTML = "";

        data.messages.forEach(renderMessage);

    }

    catch (error) {

        console.log(error);

    }

}

// ==========================================
// Render Message
// ==========================================

function renderMessage(message) {

    const div = document.createElement("div");

    div.className =

        message.senderId == user.id

            ?

            "message sent"

            :

            "message received";

    div.textContent = message.message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

// ==========================================
// Send Message
// ==========================================

// ==========================================
// Send Message
// ==========================================

sendBtn.addEventListener(

    "click",

    async () => {

        const text = messageInput.value.trim();

        if (!text || !receiverId) {

            return;

        }

        try {

            const response = await fetch(

                API_URL,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        receiverId,

                        message: text

                    })

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            renderMessage(data.message);

            socket.emit(

                "newMessage",

                data.message

            );

            messageInput.value = "";

            loadChatUsers();

        }

        catch (error) {

            console.log(error);

        }

    }

);

// ==========================================
// Receive Message
// ==========================================

socket.on(

    "receiveMessage",

    message => {

        if (

            message.senderId == receiverId ||

            message.receiverId == receiverId

        ) {

            renderMessage(message);

        }

    }

);

// ==========================================
// Refresh Chat List
// ==========================================

socket.on(

    "chatListUpdated",

    () => {

        loadChatUsers();

    }

);

// ==========================================
// Enter Key
// ==========================================

messageInput.addEventListener(

    "keypress",

    event => {

        if (event.key === "Enter") {

            sendBtn.click();

        }

    }

);

// ==========================================
// Init
// ==========================================

loadChatUsers();

if (receiverId) {

    loadMessages();

}