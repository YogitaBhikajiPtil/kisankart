# 🌾 KisanKart — Agricultural Marketplace

KisanKart is a full-stack agricultural marketplace that connects **farmers and customers** on a single platform. Farmers can list and manage their agricultural products, while customers can discover products, add them to cart or wishlist, place orders, make payments, and track deliveries.

The project is designed with a focus on **real-world e-commerce functionality, role-based access, secure authentication, cloud deployment, and scalable backend architecture**.

---

## 🚀 Live Demo

Frontend: https://yogitabhikajiptil.github.io/kisankart/

Backend/API: https://kisankart-e53b.onrender.com

---

## ✨ Key Features

### 👨‍🌾 Farmer Module

* Farmer registration and login
* Add agricultural products
* Update and delete products
* Manage product details and pricing
* View customer orders
* Manage order status

### 🛒 Customer Module

* Customer registration and login
* Browse agricultural products
* Search and filter products
* View product details
* Add products to cart
* Wishlist management
* Place orders
* Online payment
* View order history
* Track order status
* Submit product reviews and ratings

### 🔐 Authentication & Security

* JWT-based authentication
* Password hashing using bcrypt
* Role-based authorization
* Protected API routes
* Secure environment-variable configuration

### 💳 Orders & Payments

* Cart management
* Order creation
* Order status management
* Payment integration
* Transaction handling
* Payment verification

### 🚚 Delivery

* Order tracking
* Delivery status updates
* Customer order history

### 💬 Communication

* Real-time chat functionality
* Customer–farmer communication

### 📊 Analytics

* Product and order analytics
* Farmer-related statistics
* Customer/order insights

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* DOM Manipulation

### Backend

* Node.js
* Express.js
* Sequelize ORM
* REST APIs

### Database

* MySQL

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Cloud & Deployment

* AWS EC2
* AWS RDS
* AWS S3
* AWS CloudFront
* Nginx
* PM2
* AWS IAM

### Other Technologies

* Socket.IO
* Google Maps API
* Payment Gateway Integration

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │       Customer       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Frontend        │
                    │   HTML/CSS/JavaScript│
                    └──────────┬───────────┘
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │      Express.js      │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
             ┌─────────────┐       ┌─────────────┐
             │  Sequelize  │       │   Socket.IO │
             │     ORM     │       │   Real-time │
             └──────┬──────┘       └─────────────┘
                    │
                    ▼
             ┌─────────────┐
             │    MySQL    │
             │     RDS     │
             └─────────────┘

                 AWS Infrastructure
        ┌─────────────────────────────────┐
        │ EC2 + Nginx + PM2 + S3 + RDS   │
        └─────────────────────────────────┘
```

---

## 📁 Project Structure

```text
KisanKart/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Main API Modules

```text
/api/auth
/api/users
/api/products
/api/cart
/api/wishlist
/api/orders
/api/payments
/api/delivery
/api/reviews
/api/chat
/api/notifications
/api/analytics
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=5000

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306

JWT_SECRET=your_jwt_secret

PAYMENT_KEY_ID=your_payment_key
PAYMENT_KEY_SECRET=your_payment_secret

GOOGLE_MAPS_API_KEY=your_google_maps_key
```

**Never commit your `.env` file or secret credentials to GitHub.**

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd KisanKart
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the required database, JWT, payment, and API credentials.

### 4. Start the backend

```bash
npm start
```

For development:

```bash
npm run dev
```

### 5. Run the frontend

Open the frontend `index.html` using a local server such as VS Code Live Server.

---

## ☁️ AWS Deployment

The application was deployed using AWS services.

### EC2

Used to host the Node.js/Express backend.

### RDS

Used as the managed MySQL database.

### S3

Used for hosting frontend/static assets.

### Nginx

Used as a reverse proxy for the backend.

### PM2

Used to keep the Node.js application running in production.

### CloudFront

Used for content delivery and improved frontend performance.

### IAM

Used for managing AWS permissions and access.

---

## 🔄 Application Flow

```text
User
  ↓
Frontend
  ↓
Authentication
  ↓
JWT Token
  ↓
Protected API
  ↓
Express.js Controller
  ↓
Sequelize ORM
  ↓
MySQL Database
  ↓
Response
  ↓
Frontend
```

---

## 🧪 Testing

The application was tested for:

* User registration and login
* JWT authentication
* Role-based authorization
* Product CRUD operations
* Cart operations
* Wishlist operations
* Order creation
* Payment flow
* Reviews and ratings
* API validation
* Database relationships
* Error handling
* AWS deployment

---

## 🎯 Project Highlights

* Built a complete **full-stack agricultural marketplace**
* Implemented **multi-role authentication and authorization**
* Designed RESTful APIs using **Node.js and Express.js**
* Used **Sequelize ORM with MySQL**
* Implemented cart, wishlist, orders, payments, reviews, and delivery modules
* Added real-time communication using **Socket.IO**
* Integrated **Google Maps**
* Implemented **group buying and trust-score functionality**
* Deployed backend and database using **AWS EC2 and RDS**
* Used **Nginx and PM2** for production backend deployment
* Used **AWS S3 and CloudFront** for frontend delivery

---

## 👩‍💻 Author

**Yogita Patil**

B.Tech — Computer Science Engineering

GitHub: Add your GitHub profile URL

LinkedIn: Add your LinkedIn profile URL

---

## 📌 Future Enhancements

* AI-based product recommendations
* Advanced farmer analytics
* Demand prediction
* Improved delivery optimization
* Multilingual support
* Mobile application
* Advanced fraud detection

```

**For your GitHub repository, I recommend replacing only these placeholders:** `Frontend URL`, `Backend URL`, `GitHub URL`, and `LinkedIn URL`. Also, make sure the README matches the features that are actually implemented in your current code before presenting it to recruiters.
```
