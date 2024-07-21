import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    try {
        console.log("userID", userId);
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
        console.log(token);
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true, // prevents client-side scripts from accessing the cookie
            sameSite: 'strict', // enforces SameSite cookie policy
            secure: process.env.NODE_ENV === 'production'
        });
    } catch (error) {
        console.log("Error in generating token", error.message);
        res.status(500).send("Internal Server Error");
    }
};

export default generateToken;