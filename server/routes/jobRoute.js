const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(jobController.getJobs)
  .post(authController.protect, jobController.addJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .put(authController.protect, jobController.editJob)
  .delete(authController.protect, jobController.deleteJob);

module.exports = router;
