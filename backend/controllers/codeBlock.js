// import { useSocketContext } from "../../frontend/src/context/SocketContext.jsx";
import CodeBlock from "../models/codeBlock.js";
import { io, server } from "../socket/socket.js";

export const createCodeBlock = async (req, res) => {
    try {
        const { title, code } = req.body;
        const user = req.user;

        if (!title || !code) {
            return res.status(400).send({ error: 'title and code are required' });
        }

        const newCodeBlock = new CodeBlock({
            mentorId: user._id,
            title: title,
            code: code
        })

        if (!newCodeBlock) {
            return res.status(400).send({ error: 'cannot create new CodeBlock' });
        }

        await newCodeBlock.save();

        res.status(201).json(newCodeBlock);
    } catch (error) {
        console.log("error create code block: ", error.message);
        res.status(400).json({ error: "Internal server error" });
    }
};

export const getCodeBlocks = async (req, res) => {
    try {

        const codeBlocks = await CodeBlock.find({});

        if (!codeBlocks) return res.status(200).json([]);
        res.status(200).json(codeBlocks);

    } catch (error) {
        console.log("error getting code blocks: ", error.message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const getCodeBlock = async (req, res) => {
    try {
        const id = req.params.id;
        const codeBlock = await CodeBlock.findById(id);

        if (!codeBlock) return res.status(200).json([]);
        res.status(200).json(codeBlock);

    } catch (error) {
        console.log("error getting code blocks: ", error.message);
        res.status(500).send({ error: "Internal server error" });
    }
};

export const updateCodeBlock = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body; // Data to update the code block
        const updatedCodeBlock = await CodeBlock.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedCodeBlock) {
            return res.status(404).json({ message: 'Code block not found' });
        }

        // socket.on("getOnlineUsers", (user) => {
        //     console.log("getOnlineUsers:" ,user);
        //     io.to(user._id).emit("updateCodeBlock", updatedCodeBlock);
        // });

        io.emit("updateCodeBlock", updatedCodeBlock);

        res.status(200).json(updatedCodeBlock);
    } catch (error) {
        console.log("Error updating code block: ", error.message);
        res.status(500).send({ error: "Internal server error" });
    }
};