import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/* Register User*/

export const register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email, 
            password, 
            picturePath, 
            friends, 
            location, 
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);  
        
        const newUser = new User({
            firstName,
            lastName,
            email, 
            password: passwordHash, 
            picturePath, 
            friends, 
            location, 
            occupation,
            viewedProfiles: Math.floor(Math.random() * 1000),
            likedProfiles: Math.floor(Math.random() * 1000),
            dislikedProfiles: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };


/* Logging in*/

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
