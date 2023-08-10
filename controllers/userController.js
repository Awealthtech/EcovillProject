const userSchema = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const OTP = require("../models/otpModel");
// const sendchamp = require('sendchamp');

// signupGet
const signup_get = async (req, res) => {
  return res.render("userInfo", { error: "" });
};

const login_get = async (req, res) => {
  return res.render("login", { error: "" });
};

const signup = async (req, res) => {
  const { email, name, phoneNumber, Address, Zone, category } = req.body;
  try {
    // Check if the phone number already exists
    const existingUser = await userSchema.findOne({ phoneNumber });
    const OTPUser = await OTP.findOne({ email });
    if (existingUser || !OTPUser) {
      res.render("userInfo", {error: "phone number already exist!! proceed to Login"})
    }

    // Create a new user
    const newUser = new userSchema({
      phoneNumber,
      name,
      email,
      Address,
      Zone,
      category
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
    res.redirect("/api/home", 200, {user}, { error: "" } );
  } catch (error) {
    console.error(error);
    res.render("login", { error: "user not found or incorrect number" } );
  }
};

// profile Api

  const profile = async (req, res) => {
    try {
      const user = await userSchema.findById(req.params.id);
      res.render("profile");
    } catch (error) {
      res.redirect("/api/home")
    }
  };


const home_get = async (req, res) => {
  return res.render("home", { error: "" });
};

module.exports = {
  signup,
  login,
  signup_get,
  login_get,
  profile,
  home_get
};
