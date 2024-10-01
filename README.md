Shop-Fashion Website - ReactJS

This project is a fashion e-commerce platform developed using ReactJS for the frontend. It provides user authentication using OAuth2 with Google, real-time notifications and chat.


Features

User Authentication with Google OAuth2

Product Search and Filtering (powered by Elasticsearch on backend)

Shopping Cart with state management

Real-time Notifications, chat (using WebSocket)

Fully responsive user interface


Prerequisites

Before running the project, ensure you have the following installed on your machine:

Node.js (v12 or higher)

npm (comes with Node.js)

Git

Getting Started

Clone the Repository
git clone https://github.com/Minh718/fe-shop-fashion.git

cd fe-shop-fashion

After cloning, install the required dependencies by running:

npm install


Setup Environment Variables

Create a .env file in the root directory of your project with the following contents:

REACT_APP_API_URL: The base URL for your backend API (should point to your Spring Boot server).

REACT_APP_CLIENT_GOOGLE_ID: Google OAuth2 Client ID for authentication.

REACT_APP_REDIRECT_GOOGLE_URI: Redirect URI after successful Google authentication.

REACT_APP_AUTH_URI: Google OAuth2 authentication endpoint.

REACT_APP_URL_FE: The frontend URL, typically running on port 3000 during development.


Once the .env file is configured, you can start the development server by running:

npm start

The app should now be running on http://localhost:3000.


This project communicates with a backend built with Spring Boot. Make sure the backend server is running on http://localhost:8080 or change the REACT_APP_API_URL in the .env file accordingly.


Technologies Used

ReactJS: For building the user interface.

Redux: For managing application state.

Axios: For API calls.

OAuth2: For user authentication via Google.

WebSocket: For real-time notifications.
