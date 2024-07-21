import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.js";
import connectToMongoDB from "./db/connect.js";
import codeBlocksRoutes from "./routes/codeblocks.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // to parse the imcoming requests with JSON payloads (req.body)
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/codeblocks", codeBlocksRoutes);

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    connectToMongoDB();
    console.log('listening on port ' + PORT);
});