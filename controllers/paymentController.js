// controllers/paymentController.js
const axios = require("axios");
const Payment = require("../models/Payment");
const dotenv = require("dotenv");
dotenv.config();

const paystackApi = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  },
});

async function initializePayment(req, res) {
  try {
    const { email, amount } = req.body;
    const response = await paystackApi.post("/transaction/initialize", {
      email,
      amount: amount * 100, // Paystack expects amount in kobo (i.e., 100 kobo = 1 Naira)
    });

    // Save payment details to MongoDB
    const payment = new Payment({
      email,
      amount,
      reference: response.data.data.reference,
    });
    await payment.save();

    res.redirect(response.data.data.authorization_url);
    // res.json(response.data.data.authorization_url);
  } catch (error) {
    console.error(error);
    res.render("error", {
      error: "An error occurred while initializing payment."});
    // res.json({message: "an error occurred"})
  }
}

async function verifyPayment(req, res) {
  try {
    const { reference } = req.query;
    const verifyResponse = await paystackApi.get(
      `/transaction/verify/${reference}`
    );
    if (verifyResponse.data.data.status === "success") {
      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status: "success" }
      );
      if (!payment) {
        return res.render("error", { error: "Payment not found." });
      }
      res.render("success", { reference });
      // res.json(reference)
    } else {
      // res.json({message: "payment verification failed"})
      res.render("error", { error: "Payment verification failed." });
    }
  } catch (error) {
    console.error(error);
    res.render("error", {
      error: "An error occurred while verifying payment.",  });
    // res.json({message: "An error occurred while verifying payment."})  
  }
}

module.exports = {
  initializePayment,
  verifyPayment,
};
