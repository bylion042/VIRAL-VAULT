require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const cron = require('node-cron');
const User = require('./models/User'); // Import User model

const app = express();

// Use the correct MongoDB URI
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit the app if MongoDB connection fails
  });

// Load Routes
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const payment = require('./routes/investment');
const monetizeRoutes = require('./routes/monetize');

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use environment variable for secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Set secure cookie in production
}));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/api/investment', payment);
app.use('/api/monetize', monetizeRoutes);

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});


// UPDATEBALANCE DAILY 
// Schedule task to run daily at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
  const users = await User.find(); // Find all users

  users.forEach(async (user) => {
    // Calculate the number of days since the user made the investment
    const daysSinceInvestment = Math.floor((new Date() - new Date(user.investmentDate)) / (1000 * 60 * 60 * 24));

    // If it's less than 30 days, calculate and update the balance
    if (daysSinceInvestment < 30) {
      const dailyIncrement = user.balance * user.dailyReturnPercentage; // Increment based on the daily return percentage
      user.balance += dailyIncrement;

      // Update lastUpdated date
      user.lastUpdated = new Date();

      // Save the updated user data
      await user.save();
    } else {
      // If it's been 30 days, stop updating the balance (no further increments)
      console.log(`User ${user.email} has completed the 30-day cycle. No more updates.`);
    }
  });
});
console.log('Daily balance update task scheduled');


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
