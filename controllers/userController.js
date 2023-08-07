const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const OTP = require("../models/otpModel");
// const sendchamp = require('sendchamp');

// signupGet
const signup_get = async (req, res) => {
  return res.render("UserInfo", { error: "" });
};

const login_get = async (req, res) => {
  return res.render("login", { error: "" });
};

const signup = async (req, res) => {
  const { email, name, phoneNumber, Address, Zone } = req.body;
  try {
    // Check if the phone number already exists
    const existingUser = await userSchema.findOne({ phoneNumber });
    const OTPUser = await OTP.findOne({ email });
    if (existingUser || !OTPUser) {
      res.render("userInfo", {error: ""})
    }

    // Create a new user
    const newUser = new userSchema({
      phoneNumber,
      name,
      email,
      Address,
      Zone,
    });

    await newUser.save();
    res.redirect("/api/login", 200, {error: ""})
  } catch (error) {
    console.error(error);
    res.render("userInfo", {error: ""})
  }
};

// login API
const login = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Find the user by email
    const user = await userSchema.findOne({ phoneNumber });
    if (!user) {
      res.render("login", { error: "user not found or incorrect number" } );
    }

    // Generate and return the JWT
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "200000h",
    });
    res.render("home", { error: "" } );
  } catch (error) {
    console.error(error);
    res.render("login", { error: "user not found or incorrect number" } );
  }
};

// profile Api

const profile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userSchema.find({email});
    if (!user) {
     res.status(404).render("error", { error: "User not found" });
    }
    res.render("profile", { user });
    console.log({user});
  } catch (error) {
    console.error(error);
    res.render("error", { error: "An error occurred while fetching user profile" });
  }
};

module.exports = {
  signup,
  login,
  signup_get,
  login_get,
  profile,
};
