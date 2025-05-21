const express = require('express');
const router = express.Router();
const summarizeController = require('../controllers/summarizeController');

// Summarize todos and send to Slack
router.post('/', summarizeController.summarizeAndSend);

module.exports = router;