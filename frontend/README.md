# Code Blocks Frontend

## Overview

This project is the frontend for a code block management application, built with React and integrated with a backend API for managing code blocks. It includes user authentication, real-time updates using Socket.IO, and various features to manage and interact with code blocks.

## Features

- #### **User Authentication:** Login functionality.
- #### **Code Block Management:** View, select, and update code blocks.
- #### **Real-Time Updates:** Real-time communication with the backend using Socket.IO.
- #### **Responsive UI:** Built with Bootstrap for responsive design.

## Folder Structure
- #### App.jsx: Main application component. Sets up routes and authentication logic.
- #### main.jsx: Entry point for the React application. Wraps the app with necessary context providers and sets up routing.
- #### pages/home/Home.jsx: Home page component. Handles code block selection, viewing, and editing with real-time updates.
- #### context/useAuthContext.jsx: Context provider for managing user authentication state.
- #### context/SocketContext.jsx: Context provider for managing Socket.IO connections.
- #### components/CodeBlockDropDown.jsx: Component for selecting code blocks from a dropdown.
- #### components/CodeBlockEditor.jsx: Component for editing code blocks.
- #### components/CodeBlockViewer.jsx: Component for viewing code blocks using highlight.js.

  ### Custom Hooks
- #### hooks/useGetCodeBlocks.js: Custom hook for fetching code blocks.
- #### hooks/useUpdateCodeBlock.js: Custom hook for updating code blocks.
- #### hooks/useLofin.js: Custom hook for handling user's login.


## Real-Time Communication
The frontend communicates with the backend in real-time using Socket.IO. This allows for instant updates and dynamic interactions within the application.

## API Endpoints
Ensure the frontend communicates with the correct backend endpoints as specified in the backend's README file.

## Usage
- ####  Login: Navigate to /login to log in to the application.
- #### Home: Once logged in, navigate to / to access the home page where you can select, view, and update code blocks.
