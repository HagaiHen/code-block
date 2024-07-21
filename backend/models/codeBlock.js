import mongoose from "mongoose";

const CodeBlockSchema = new mongoose.Schema({
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
});

const CodeBlock = mongoose.model("CodeBlock", CodeBlockSchema);

export default CodeBlock;