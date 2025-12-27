const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenID: { type: String, required: true, unique: true }, // e.g., NADRA-101
  name: { type: String, required: true },
  email: { type: String }, // Optional
  department: { type: String, required: true }, // e.g., NADRA, Passport
  service: { type: String, required: true },    // e.g., Renewal
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'Skipped'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Token', tokenSchema);