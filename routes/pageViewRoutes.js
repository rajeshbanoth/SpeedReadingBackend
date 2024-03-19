const express = require("express");
const { body } = require('express-validator');

const router = express.Router();
const pageViewController = require("../controllers/pageViewController");

const validatePageView = [
    body('pageUrl').trim().notEmpty().withMessage('Page URL is required'),
    body('sessionId').trim().notEmpty().withMessage('Session ID is required'),
    // Add more validations as needed
  ];

// Route to create a new page view
router.post("/page-view",validatePageView, pageViewController.createPageView);
router.get('/page-views', pageViewController.getAllPageViews);
router.get('/unique-page-views', pageViewController.getUniquePageViewsCount);
router.get('/total-page-views', pageViewController.getTotalPageViewsCount);
router.put('/page-view/:id',validatePageView, pageViewController.updatePageView);
router.delete('/page-view/:id', pageViewController.deletePageView);

module.exports = router;
