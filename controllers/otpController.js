const nodemailer = require("nodemailer");
const OTP = require("../models/otpModel");

// Function to send OTP via email
class OTPController {
  // sendOtp verified page
  static async sendOtpGet(req, res) {
    return res.render("index", { error: "" });
  }
  // otpVerificationGet
  static async otpVerificationGet(req, res) {
    return res.render("otpVerification", { error: "" });
  }

  static async sendOTP(req, res) {
    const { email } = req.body;
    const existingUser = await OTP.findOne({ email });
    if (existingUser) {
      res.render("index", { error: "existing user" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

    // Save the OTP to the database
    const otpInstance = new OTP({ email, otp });
    await otpInstance.save();

    // Send the OTP via email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP sent via email");
      res.redirect("/verifyOTP",200, { error: "" }) 
    } catch (error) {
      console.log("Error sending OTP:", error);
      res.render("index", { error: "existing user" });
    }
  }

  static async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      const savedOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

      if (!savedOTP) {
        res.render("otpVerification", { error: "invalid" });
      }

      if (otp === savedOTP.otp){
        // OTP is valid
        res.redirect( "/api/signup",200, { error: "" }) 
        console.log("otp verified")
      } else {
        // Invalid OTP
        res.render("otpVerification", { error: "invalid" });
      }
    } catch (error) {
      res.render("otpVerification", { error: "invalid" });
    }
  }
}
module.exports = OTPController;
