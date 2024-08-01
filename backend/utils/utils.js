import CodeBlock from "../models/codeBlock.js";

export const removeMentorIdPremission = async (mentorId) => {
    try {
        const codeBlockList = await CodeBlock.find({});
        
        for (const codeBlock of codeBlockList) {
            if (codeBlock.mentorId === mentorId) {
                const updatedCodeBlock = await CodeBlock.findOneAndUpdate(
                    { _id: codeBlock._id },
                    { $set: { mentorId: "" } }, // Use $set to update the mentorId field
                    { new: true }
                );
            }
        }
    } catch (error) {
        console.log("Error removing permissions: ", error.message);
    }
};