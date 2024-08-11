const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const config = require('config');
const path = require('path');
const fs = require('fs');

// Register User
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, username } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        let userName = await User.findOne({ username });
        if (userName) {
            return res.status(400).json({ message: "Username Already Taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            username,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            },
        };
// console.log("user id", req.user.id)
        const token = jwt.sign(payload, process.env.JWT_SECRET || config.get('jwtSecret'), {
            expiresIn: '1h',
        });
console.log("generated token : ",token)
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || config.get('jwtSecret'), {
            expiresIn: "1h"
        });

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



const updateuserProfile = async (req, res) => {
    try {
        console.log('Request user id :', req.user.id); // Debugging
          console.log('Request user:', req.user); // Debugging
        const user = await User.findById(req.user.id);
console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Define the path to the uploads directory at the root level
        const uploadsDir = path.join(__dirname, '../../uploads');

        // Ensure uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Handling profile picture upload
        if (req.files && req.files.profilePicture) {
            const profilePic = req.files.profilePicture;
            const profilePicName = Date.now() + path.extname(profilePic.name);
            const profilePicPath = path.join(uploadsDir, profilePicName);

            // Move file to uploads directory
            await profilePic.mv(profilePicPath);
            user.profilePicture = `/uploads/${profilePicName}`; // Relative URL to access the image
        }

        // Handling cover picture upload
        if (req.files && req.files.coverPicture) {
            const coverPic = req.files.coverPicture;
            const coverPicName = Date.now() + path.extname(coverPic.name);
            const coverPicPath = path.join(uploadsDir, coverPicName);

            // Move file to uploads directory
            await coverPic.mv(coverPicPath);
            user.coverPicture = `/uploads/${coverPicName}`; // Relative URL to access the image
        }

        // Update bio
        user.bio = req.body.bio || user.bio;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
module.exports = { registerUser, loginUser, updateuserProfile };
