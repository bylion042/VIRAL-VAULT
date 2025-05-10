const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/User'); // Import User model

require('dotenv').config();

router.post('/verify-payment', async (req, res) => {
  // Check if the user is authenticated via session
  if (!req.session.user) {
    return res.status(403).json({ message: 'Unauthorized, please log in' });
  }

  const { transaction_id } = req.body;
  const userEmail = req.session.user.email; // Get email from session

  try {
    // Call Flutterwave API to verify the payment status
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`, // Your secret key from Flutterwave
      },
    });

    const paymentData = response.data.data;

    if (paymentData.status === 'successful') {
      const amount = paymentData.amount;

      // Find the user using the session data (email)
      const user = await User.findOne({ email: userEmail });

      if (!user) return res.status(404).json({ message: 'User not found' });

      // If it's the user's first investment or a successful top-up
      user.balance += amount;
      user.transactions.push({
        tx_ref: paymentData.tx_ref,
        amount,
        status: paymentData.status,
      });

      // Set the investment date if it's the first payment
      if (!user.investmentDate) {
        user.investmentDate = new Date();
        user.dailyReturnPercentage = 0.01; // Example: 1% daily return (for 30 days)
      }

      // Save the updated user data
      await user.save();

      // Respond with the new balance
      res.json({ success: true, newBalance: user.balance });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

module.exports = router;
