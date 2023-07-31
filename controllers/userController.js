const userSchema = require('../models/users');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// const sendchamp = require('sendchamp');

// signupGet
const signup_get = async(req, res) => {
    return res.render("Userinfo", { error: "" });
  };

const login_get = async(req, res) => {
    return res.render("login", { error: "" });
  };

const signup = async (req, res) => {
    const { email, name, phoneNumber, Address, Zone } = req.body;
    try {
        // Check if the phone number already exists
        const existingUser = await userSchema.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // Create a new user
        const newUser = new userSchema({
            phoneNumber,
            name,
            email,
            Address,
            Zone
        });

        await newUser.save();
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// login API
const login = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        // Find the user by email
        const user = await userSchema.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user details' });
        }

        // Generate and return the JWT
        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '200000h' });

        return res.status(200).json({ message: "Login successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    signup_get, 
    login_get
}