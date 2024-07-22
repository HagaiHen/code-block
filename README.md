# Code Blocks Management Application

## Overview

This project is a full-stack application for managing code blocks, designed to facilitate remote mentoring sessions. The application allows a mentor to share a piece of code with a student, observe real-time changes made by the student, and provide feedback. The backend is built with Node.js, Express, and MongoDB, while the frontend is developed using React. Real-time communication is handled using Socket.IO.


## Features

- #### **User Authentication**: Signup, login, and logout functionality.
- #### **Code Block Management**: Create, read, update, and delete code blocks.
- #### **Real-Time Updates**: Real-time communication with clients using Socket.IO.
- #### **Protected Routes**: Certain routes are protected and require authentication.
- #### **Responsive UI**: Built with Bootstrap for responsive design.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/HagaiHen/code-block
```

2. **Install dependencies for backend:**
```bash
npm insatll
```

3. **Install dependencies for frontend:**
   ```bash
   cd frontend
   npm install
   ```
4. **Create a .env file**
```bash
MONGO_DB=<your-mongodb-uri>
PORT=5000
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```
Replace **<your-mongodb-uri>** with your actual MongoDB connection URI and **<your-jwt-secret>** with your desired JWT secret.

### Running the Application
1. **Start the backend server:**
```bash
cd <to the root dir>
npm run server
```
2. **Start the frontend application:**
In another terminal:
```bash
cd frontend
npm run dev
```
The backend server will start and listen on the specified port (default: 5000). The frontend application will be accessible at http://localhost:3000.

## Folder Structure
### Backend
- #### server.js: Entry point for the application. Sets up middleware, routes, and starts the server.
- #### routes/auth.js: Defines routes for user authentication.
- #### routes/codeblocks.js: Defines routes for managing code blocks.
- #### controllers/auth.js: Contains logic for authentication-related operations.
- #### controllers/codeBlock.js: Contains logic for code block operations.
- #### middleware/protectRoute.js: Middleware to protect routes that require authentication.
- #### db/connect.js: Handles the connection to MongoDB.
- #### socket/socket.js: Manages WebSocket connections using Socket.IO.
### Frontend
- #### App.jsx: Main application component. Sets up routes and authentication logic.
- #### main.jsx: Entry point for the React application. Wraps the app with necessary context providers and sets up routing.
- #### pages/home/Home.jsx: Home page component. Handles code block selection, viewing, and editing with real-time updates.
- #### context/useAuthContext.jsx: Context provider for managing user authentication state.
- #### context/SocketContext.jsx: Context provider for managing Socket.IO connections.
- #### components/CodeBlockDropDown.jsx: Component for selecting code blocks from a dropdown.
- #### components/CodeBlockEditor.jsx: Component for editing code blocks.
- #### components/CodeBlockViewer.jsx: Component for viewing code blocks.
- #### hooks/useGetCodeBlocks.js: Custom hook for fetching code blocks.
- #### hooks/useUpdateCodeBlock.js: Custom hook for updating code blocks.
- #### hooks/useLogin.js: Custom hook for logging users.

## Real-Time Communication
The frontend communicates with the backend in real-time using Socket.IO. This allows for instant updates and dynamic interactions within the application.

## Usage
### 1. Login: Navigate to /login to log in to the application.
### 2. Home: Once logged in, navigate to / to access the home page where you can select, view, and update code blocks.
