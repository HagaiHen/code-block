import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Handling signup
export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }

        //check for duplicate username
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        if (!newUser) {
            return res.status(400).send({ error: 'Failed to save user' });
        }

        // generate token here
        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
        });

    } catch (err) {
        console.log("error in signup controller: ", err.message);
        return res.status(400).send({ message: err.message });
    }
};

//Handling login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        //check if the password is correct
        const isMatch = await bcrypt.compare(password, user?.password || "");
        if (!user || !isMatch) {
            return res.status(400).send({ error: 'Invalid username or password' });
        }

        // generate token here
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
        });

    } catch (err) {
        console.log("Error during login: ", err.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Handling logout
export const logout = async (req, res) => {
    try {
        // delete the token from the cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.log("Error during logout: ", err.message);
        res.status(500).send({ error: 'Internal server error' });
    }
};