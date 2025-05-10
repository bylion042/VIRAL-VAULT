const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/User');
const deviceCheck = require('../middlewares/deviceCheck');



// Landing Page
router.get('/', (req, res) => {
  res.render('index');
});


// Login Page
router.get('/login', (req, res) => {
  res.render('login');
});


// Register Page
router.get('/register', (req, res) => {
  const referredBy = req.session.referredBy || null;
  res.render('register', { referredBy });
});


// forgot-password Page
router.get('/forgot-password', (req, res) => {
  const referredBy = req.session.referredBy || null;
  res.render('forgot-password', { referredBy });
});


router.get('/dashboard', deviceCheck, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});



// Account withdraw (Protected)
router.get('/withdraw', deviceCheck, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  // Pass the balance along with user data to the view
  const userBalance = req.session.user.balance;

  res.render('withdraw', { user: req.session.user, balance: userBalance });
});


// message investment (Protected)
// Message Investment (Protected Route)
router.get('/investment', deviceCheck, async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // Fetch the user from the database using the email from the session
  const user = await User.findOne({ email: req.session.user.email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Pass the entire user object to the view, including the email and balance
  res.render('investment', { user: req.session.user, email: req.session.user.email, balance: user.balance });
});


// mine Page (Protected)
router.get('/mine', deviceCheck, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('mine', { user: req.session.user });
});


// mine quiz (Protected)
router.get('/quiz', deviceCheck, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('quiz', { user: req.session.user });
});


// mine Socilal task (Protected)
router.get('/social-task', deviceCheck, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('social-task', { user: req.session.user });
});


// Monetize (Protected Route)
router.get('/monetize', deviceCheck, async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  // Fetch full user data from the database
  const user = await User.findOne({ email: req.session.user.email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Render view with full user data
  res.render('monetize', {
    user: req.session.user,
    email: req.session.user.email,
    balance: user.balance // Optional, in case you want to show balance
  });
});


// Logout Route
router.get('/logout', deviceCheck, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/login'); // Redirect to login page after logging out
  });
});



router.get('/desktop-blocked', (req, res) => {
  res.render('desktop-blocked');
});

module.exports = router;
