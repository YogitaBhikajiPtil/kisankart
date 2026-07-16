const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "../login.html";

}

const PAYMENT_API =
    "http://localhost:5000/api/customer/payment";

const params = new URLSearchParams(window.location.search);

const orderId = params.get("orderId");

const orderIdElement = document.getElementById("orderId");

const amountElement = document.getElementById("amount");

const payBtn = document.getElementById("payBtn");

let razorpayOrder;
let razorpayKey;

// ==========================================
// Create Razorpay Order
// ==========================================

async function createPaymentOrder() {

    try {

        console.log(`${PAYMENT_API}/create-order/${orderId}`);

        const response = await fetch(

            `${PAYMENT_API}/create-order/${orderId}`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        razorpayOrder = data.order;
        razorpayKey = data.key;

        orderIdElement.textContent = orderId;

        amountElement.textContent =
            razorpayOrder.amount / 100;

    }

    catch (error) {

        alert(error.message);

    }

}

createPaymentOrder();


// ==========================================
// Razorpay Payment
// ==========================================

payBtn.addEventListener(

    "click",

    function () {

        const options = {

            key: razorpayKey,

            amount: razorpayOrder.amount,

            currency: razorpayOrder.currency,

            name: "KisanKart",

            description: "Order Payment",

            order_id: razorpayOrder.id,

            handler: async function (response) {

                await verifyPayment(response);

            },

            theme: {

                color: "#2E7D32"

            }

        };

        const rzp = new Razorpay(options);

        rzp.open();

    }

);


// ==========================================
// Verify Payment
// ==========================================

async function verifyPayment(paymentData) {

    try {

        const response = await fetch(

            `${PAYMENT_API}/verify`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(paymentData)

            }

        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message);

        }

        alert("Payment Successful");

        window.location.href = "./orders.html";

    }

    catch (error) {

        alert(error.message);

    }

}