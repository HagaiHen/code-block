import CodeBlock from "../models/codeBlock.js";

export const createCodeBlock = async (req, res) => {
    try {
        const {title, code} = req.body;
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
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("error getting messages: ", error.message);
        res.status(500).send({ error: "Internal server error" });
    }
};