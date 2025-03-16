# **Quick-Serve: Food Ordering App (MERN Stack)**

Quick-Serve is a **feature-rich** food ordering and delivery tracking platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **TypeScript**. This app allows users to browse restaurants, place food orders, and track deliveries in real-time. Restaurant owners can manage their restaurants, update menus, and handle orders seamlessly. The app integrates **Auth0 for authentication**, **Stripe for payments**, and **Cloudinary for image storage**.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
   - [User Features](#user-features)
   - [Restaurant Owner Features](#restaurant-owner-features)
3. [Technologies Used](#technologies-used)
4. [Setup & Installation](#setup--installation)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Testing](#testing)
6. [Usage](#usage)
7. [Live Application](#live-application)
8. [Contributions](#contributions)

---

## **Project Overview**

This application allows users to order food, track their deliveries, and manage their profiles. The system is built with **MERN stack (MongoDB, Express.js, React.js, Node.js)**, ensuring a seamless experience for both users and administrators.

---

## **Features**

### User Features:
- **Secure Authentication**: Login using **Auth0**.
- **Profile Management**: View, edit, and save user profiles with real-time database updates.
- **Search & Filter Restaurants**: Search by name, city, or cuisine, and sort results by relevance, best match, delivery time, or price.
- **Add to Cart & Checkout**: Real-time cart updates and **secure payment processing via Stripe**.
- **Order Tracking**: View order status, delivery time, and order details in real-time.

### Restaurant Owner Features:
- **Restaurant Management**: Add or update restaurant details, including menus and images (stored in **Cloudinary**).
- **Order Management**: View and update order statuses in real-time, reflecting updates for users immediately.
- **Dynamic Menu Updates**: Add or remove items, update cuisines, and modify prices with real-time reflection.

---

## **Technologies Used**

### Frontend:
- **React.js, TypeScript**
- **Tailwind CSS**
- **React Router** for navigation
- **Auth0 React SDK** for authentication
- **JWT** for authentication

### Backend:
- **Node.js, Express.js**
- **MongoDB, Mongoose**
- **Cloudinary SDK** for image storage
- **Stripe API** for payment processing

---

## **Setup & Installation**

### Prerequisites:
- **Node.js** (>= 14.x)
- **MongoDB** (Local or Cloud)
- **Cloudinary Account** (for image storage)
- **Auth0 Account** (for authentication)
- **Stripe Account** (for payment processing)
- **Gemini AI** (using @google/generative-ai for integrating chatbot functionality)

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quick-serve.git
   cd quick-serve/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the `backend` directory and add:
   ```env
   MONGODB_CONNECTION_STRING=<your-mongodb-uri>
   
   # Auth0
   AUTH0_AUDIENCE=<your-auth0-audience>
   AUTH0_ISSUER_BASE_URL=<your-auth0-issuer>
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   
   # Stripe
   FRONTEND_URL=http://localhost:5173
   STRIPE_API_KEY=<your-stripe-api-key>
   STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>

   # Gemini AI
   GOOGLE_API_KEY=<your-google-api-key>  
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup:
1. Navigate to the `frontend` directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file in the `frontend` directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   
   # Auth0
   VITE_AUTH0_DOMAIN=<your-auth0-domain>
   VITE_AUTH0_CLIENT_ID=<your-auth0-client-id>
   VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
   VITE_AUTH0_AUDIENCE=<your-auth0-audience>
   ```
4. Start the frontend server:
   ```sh
   npm run dev
   ```

### Running the Application:
- The **frontend** will run on [localhost:5317](http://localhost:5317).
- The **backend** will run on [localhost:8000](http://localhost:8000).

---

## **Testing**

1. **Postman**: Use Postman to test API endpoints.
---

## **Usage**

1. **Users** can register/login via Auth0, browse restaurants, filter by cuisine, and place orders.
2. **Restaurant owners** can add/manage restaurant details, menus, and orders.
3. **Real-time updates** ensure smooth restaurant management and order tracking.
4. **Gemini AI Chatbot:** Users can interact with a chatbot for assistance (e.g., "What would you recommend?"). This is powered by the Gemini AI model integrated into the backend.

---

## **Live Application**

The page is live at:  
[**MERN Food Ordering App**](https://mern-food-ordering-app-frontend-kzoa.onrender.com/)

---

## **Contributions**

Contributions are welcome! Feel free to fork the repo and submit pull requests.

---
