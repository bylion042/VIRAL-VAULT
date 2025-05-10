const mongoose = require('mongoose');

// Transaction schema to track payments
const TransactionSchema = new mongoose.Schema({
  tx_ref: String,
  amount: Number,
  status: String,
  date: { type: Date, default: Date.now },
});

// User schema with necessary fields for investment tracking
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, trim: true },
  termsAccepted: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },

  // Existing fields
  balance: { type: Number, default: 0 },
  transactions: [TransactionSchema],

  // New fields for investment tracking
  investmentDate: { type: Date }, // Track when the investment was made
  dailyReturnPercentage: { type: Number }, // Track the percentage for daily return
  lastUpdated: { type: Date }, // Track the date when balance was last updated

  // ✅ Fields for password reset
  resetCode: { type: String },
  resetCodeExpires: { type: Date }
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
