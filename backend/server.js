import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import connectToMongoDB from "./db/connect.js";
import codeBlocksRoutes from "./routes/codeblocks.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config(); // Loading environment variables from a .env file
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads (req.body)
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/codeblocks", codeBlocksRoutes);

// Starting the server and connecting to MongoDB
server.listen(PORT, () => {
    connectToMongoDB();
    console.log('listening on port ' + PORT);
});