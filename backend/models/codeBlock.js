import mongoose from "mongoose";

const CodeBlockSchema = new mongoose.Schema({
    mentorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    code: {
        type: String,
        required: true
    },
    solution: {
        type: String
    },
});

const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);

export default CodeBlock;