import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { removeMentorIdPremission } from '../utils/utils.js';

const app = express();

// Creating an HTTP server on top of the Express app
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"], // Allowing CORS requests from this origin
		methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
	},
});

export const getSocketId = (userId) => {
    return userSocketMap[userId];
}

const userSocketMap = {}; // {userId: socketId}

// Handling a new socket connection
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    const userId = socket.handshake.query.userId; // Retrieving the user ID from the socket
    if (userId) userSocketMap[userId] = socket.id;
    
    //io.emit() send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    // socket.on() is used to listen to the event. used in both client and server
    socket.on('disconnect', async () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        await removeMentorIdPremission(socket.id);
    });
})

export { app, io, server };