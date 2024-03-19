const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  deviceType: String,
  browser: String,
  ipAddress: String,
  pageVisitCount: {
    type: Number,
    default: 1, // Initialize to 1 when a new page view is created
  },
  // Add more fields as needed
});

const PageView = mongoose.model('PageView', pageViewSchema);

module.exports = PageView;
