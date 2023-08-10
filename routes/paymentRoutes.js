// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const OTP = require("../models/otpModel");

// Render payment form
router.get('/pay', paymentController.pay)
// Initiate payment
router.post('/pay', paymentController.initiatePayment);

// Verify payment
router.get('/verify-payment', paymentController.verifyPayment);

module.exports = router;





// // routes/paymentRoutes.js
// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/paymentController');

// // Make payment
// router.get('/pay', paymentController.makePaymentGe
// );
// router.post('/pay', paymentController.makePayment);

// // Verify payment
// router.get('/verify-payment', paymentController.verifyPayment);

// module.exports = router;
