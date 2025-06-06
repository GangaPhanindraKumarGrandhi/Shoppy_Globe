🛍️ ShoppyGlobe E-commerce Application
ShoppyGlobe is a full-stack e-commerce application built with React (frontend), Node.js/Express (backend), and MongoDB (database). It allows users to browse products, add items to their cart, adjust quantities, and proceed to checkout.

Tech Stack
Frontend: React, Redux Toolkit, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT-based login and protected routes

State Management: Redux

API Testing: Thunder Client
Features

Navigation with Home, Cart, and Checkout pages

Add-to-Cart and Buy Now functionality

Cart item quantity controls (+/-)

Dynamic total bill calculation

Checkout with address form and validation

Rating display using star icons

Lazy loading and performance optimization

Cart persists on page refresh using localStorage

Product search

Image loading feedback

Graceful handling of API or image errors

404 page for invalid routes



Installation and How to run
Node.js v16+ installed
MongoDB installed and running locally on mongodb://localhost:27017

//clone the Repository

git clone https://github.com/GangaPhanindraKumarGrandhi/Shoppy_Globe.git
cd shoppyglobe
cd vite-project

BackendSetup
cd backendNodeJs
npm install
//Start the Backend Server
node server.js

Use thunderclient 

frontend Setup
npm install
npm run dev

//Instructions to run the project
Backend Part

1. Start the Backend Server
cd backend
npm install
node server.js
This will start the API at:http://localhost:5000

2. Register a New User
POST http://localhost:5000/register
JSON Body:
{
  "name": "John Doe",
  "password": "123456"
}
 Sample Success Response: 
  {
  "_id": "665f123abc...",
  "name": "John Doe",
  "password": "123456"
  }

3. Login User
POST http://localhost:5000/login
{
  "email": "john@example.com",
  "password": "123456"
}
 Sample Success Response:

 {
    "token": "eyJhbGciOiJIUzI1..."
 }

 After logging in or registering, copy the token from the response:

 4. Add This Header in All Protected Requests
Key: Authorization 
Vlaue:JWT <your_token>

Note:
Without This Header
If you try to access protected routes (like /cart, /checkout, etc.) without the token, you'll get:
{
  "message": "Not authorized, token failed"
}

5. MongoDB Connection (config/db.js)Edit this file
This file is used to connect your backend to your local MongoDB server using Mongoose.
Uses mongoose.connect() to connect to:
mongodb://localhost:27017/shoppyglobe

6. Import All Products("https://dummyjson.com/products")
The importAllProducts script fetches product data from the internet and stores it into the products database.
command:node importAllProducts.js

7. Delete All Products
The deleteAllProducts file is used to delete all existing products from the products database.
command:node deleteAllProducts.js

//Note:
  To import or delete products and store them into your MongoDB database, your importAllProducts script must connect to MongoDB first.

Frontend Part

1. components/Cart.
jsx Token Setup
In Cart.jsx, replace the hardcoded token with the JWT token obtained after user login to authorize API requests securely.

2. redux/cartSlice.jsx 
Token Update
In cartSlice.jsx, update the token used for API requests with the JWT token received upon user login to ensure authorized access.

//DataBase

1. Sample MongoDB Screenshots to Include:
   MongoDB Compass - Database Overview
   ![Screenshot 2025-06-06 235028](https://github.com/user-attachments/assets/7e7c100f-76a2-4810-bb27-aab500623111)
   Shows your database with collections listed (e.g., products, cart, users).

  1. Products
  ![Screenshot 2025-06-06 235048](https://github.com/user-attachments/assets/90e478d5-5a31-4c8c-96fa-440e967b5a09)

   2.cart
  ![Screenshot 2025-06-06 235040](https://github.com/user-attachments/assets/7340e9ed-f0b6-40ad-9907-b71736547345)

  3. users
  ![Screenshot 2025-06-06 235057](https://github.com/user-attachments/assets/daa26943-c2bb-4c7a-9cc5-388346716361)

   
