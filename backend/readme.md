# Code Blocks Backend

## Overview

This project provides a backend API for managing code blocks using Node.js, Express, and MongoDB. It includes user authentication and CRUD operations for code blocks.

## Features

- **User Authentication**: Signup, login, and logout functionality.
- **Code Block Management**: Create, read and update code blocks.
- **Protected Routes**: Certain routes are protected and require authentication.
- **Real-Time Updates**: Real-time communication with clients using Socket.io.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

## API Endpoints
### Authentication Routes

- #### POST /api/auth/signup: Register a new user.
- #### POST /api/auth/login: Authenticate a user and obtain a session.
- #### POST /api/auth/logout: Logout the user and invalidate the session.

### Code Blocks Routes

- #### POST /api/codeblocks/create: Create a new code block (protected).
- #### GET /api/codeblocks/get: Retrieve all code blocks (protected).
- #### GET /api/codeblocks/get/:id: Retrieve a specific code block by ID (protected).
- #### PUT /api/codeblocks/update/:id: Update a specific code block by ID (protected).

### Folder Structure
- #### server.js: Entry point for the application. Sets up middleware, routes, and starts the server.
- #### routes/auth.js: Defines routes for user authentication.
- #### routes/codeblocks.js: Defines routes for managing code blocks.
- #### controllers/auth.js: Contains logic for authentication-related operations.
- #### controllers/codeBlock.js: Contains logic for code block operations.
- #### middleware/protectRoute.js: Middleware to protect routes that require authentication.
- #### db/connect.js: Handles the connection to MongoDB.
- #### socket/socket.js: Manages WebSocket connections.
