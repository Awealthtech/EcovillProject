// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Display the payment form
router.get("/pay", (req, res) => {
  // res.json({message:"pay"})
  res.render("pay");
});

// Handle payment request
router.post("/pay", paymentController.initializePayment);

// Handle payment verification
router.get("/verify", paymentController.verifyPayment);

module.exports = router;
