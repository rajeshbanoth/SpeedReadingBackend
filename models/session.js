const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  startTimestamp: {
    type: Date,
    default: Date.now,
  },
  endTimestamp: {
    type: Date,
  },
  // Additional fields
  userAgent: String,
  ipAddress: String,
  // Add more fields as needed
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
