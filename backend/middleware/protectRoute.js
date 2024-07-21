import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        req.user = user; // add user to the request object for use in other routes or controllers

        next(); // pass the request to the next middleware or controller
    } catch (error) {
        res.status(401).json({ message: 'Not authorized to access this route' });
    }
};