import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
});

const User = mongoose.model("User", userSchema);
export default User;