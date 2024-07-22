import path from "path";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import connectToMongoDB from "./db/connect.js";
import codeBlocksRoutes from "./routes/codeblocks.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config(); // Loading environment variables from a .env file
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads (req.body)
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/codeblocks", codeBlocksRoutes);

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

// Starting the server and connecting to MongoDB
server.listen(PORT, () => {
    connectToMongoDB();
    console.log('listening on port ' + PORT);
});