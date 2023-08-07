// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Make payment
router.get('/pay', paymentController.makePayment);
router.post('/pay', paymentController.makePayment);

// Verify payment
router.get('/verify-payment', paymentController.verifyPayment);

module.exports = router;
