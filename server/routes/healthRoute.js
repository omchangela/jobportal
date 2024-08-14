const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    requestedAt: res.requestedAt
  });
});

module.exports = router;
