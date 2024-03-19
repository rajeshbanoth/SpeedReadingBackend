const { validationResult } = require("express-validator");
const PageView = require("../models/pageView");

exports.createPageView = async (req, res) => {
    try {

        console.log(req.body.deviceInfo.ipAddress,"a","new")
      // Check if the ipAddress already exists in the database
      const existingPageView = await PageView.findOne({ ipAddress: req.body.deviceInfo.ipAddress });
  
      if (existingPageView) {
        // If the ipAddress exists, update the timestamp and increment the page visit count
        existingPageView.timestamp = Date.now();
        existingPageView.pageVisitCount += 1;
  
        await existingPageView.save();
        res.json(existingPageView);
      } else {
        // If the ipAddress doesn't exist, create a new page view entry
        const newPageView = new PageView({
          pageUrl: req.body.deviceInfo.pageUrl,
          userId: req.body.deviceInfo.userId,
          sessionId: req.body.deviceInfo.sessionId,
          timestamp: Date.now(),
          deviceType: req.body.deviceInfo.deviceType,
          browser: req.body.deviceInfo.browser,
          ipAddress: req.body.deviceInfo.ipAddress,
          pageVisitCount: 1, // Initialize page visit count to 1
          // Add more fields as needed
        });
  
        await newPageView.save();
        res.json(newPageView);
      }
    } catch (err) {
        console.log(err,"er")
      res.status(500).json({ error: err.message });
    }
  };
  

exports.updatePageView = async (req, res) => {

  try {
    const updatedPageView = await PageView.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPageView);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add more controller functions as needed (e.g., get, update, delete)
// In pageViewController.js
exports.getAllPageViews = async (req, res) => {
  try {
    const pageViews = await PageView.find();
    res.json(pageViews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In pageViewController.js
exports.deletePageView = async (req, res) => {
  try {
    await PageView.findByIdAndDelete(req.params.id);
    res.json({ message: "Page view deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In pageViewController.js
// exports.getTotalPageViewsCount = async (req, res) => {
//     try {
//       const totalPageViewsCount = await PageView.countDocuments();
//       res.json({ count: totalPageViewsCount });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
exports.getTotalPageViewsCount = async (req, res) => {
    try {
      const pageViews = await PageView.find();
      let totalPageViewsCount = 0;
  
      // Sum up the pageVisitCount from all documents
      pageViews.forEach((pageView) => {
        totalPageViewsCount += pageView.pageVisitCount;
      });
  
      res.json({ count: totalPageViewsCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  // In pageViewController.js
exports.getUniquePageViewsCount = async (req, res) => {
    try {
      const uniquePageViewsCount = await PageView.distinct('pageUrl').countDocuments();
      res.json({ count: uniquePageViewsCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
