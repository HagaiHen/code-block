import CodeBlock from "../models/codeBlock.js";
import { io } from "../socket/socket.js";

// Create a new code block
export const createCodeBlock = async (req, res) => {
    try {
        const { title, code, solution } = req.body;
        const user = req.user;

        if (!title || !code) {
            return res.status(400).send({ error: 'title and code are required' });
        }

        const newCodeBlock = new CodeBlock({
            mentorId: "",
            title: title,
            code: code,
            solution: solution
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

// Get all the code blocks
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

// Get a specific code block by id
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

// Update a specific code block by id
export const updateCodeBlock = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedCodeBlock = await CodeBlock.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedCodeBlock) {
            return res.status(404).json({ message: 'Code block not found' });
        }

        //io.emit() send "updateCodeBlock" event to all connected clients
        io.emit("updateCodeBlock", updatedCodeBlock);

        res.status(200).json(updatedCodeBlock);
    } catch (error) {
        console.log("Error updating code block: ", error.message);
        res.status(500).send({ error: "Internal server error" });
    }
};