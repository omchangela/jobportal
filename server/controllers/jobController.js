const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addJob = catchAsync(async (req, res, next) => {
  const {
    companyName,
    logo,
    monthlySalary,
    jobPosition,
    jobType,
    category,
    location,
    description,
    about,
    skills,
    information
  } = req.body;

  const job = await Job.create({
    companyName,
    logo,
    jobPosition,
    monthlySalary,
    jobType,
    category,
    location,
    description,
    about,
    skills,
    information,
    createdBy: req.user._id
  });

  res.status(200).json({
    status: 'success',
    data: { job }
  });
});

exports.editJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new AppError('Job not found', 404));
  }

  //Update the job
  await Job.updateOne({ _id: id }, req.body);

  res.status(200).json({
    status: 'success',
    message: 'resource updated successfully'
  });
});

exports.getJobs = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const query = Job.find();

  if (queryObj.jobPosition && typeof queryObj.jobPosition === 'string') {
    const regex = new RegExp(queryObj.jobPosition, 'i');
    query
      .find({
        jobPosition: { $regex: regex }
      })
      .collation({ locale: 'en', strength: 2 });
  }

  if (queryObj.skills && typeof queryObj.skills === 'string') {
    const skillsArr = queryObj.skills
      .split(',')
      .map(el => el.trim().toLowerCase());
    query.find({
      skills: { $in: skillsArr.map(skill => new RegExp(skill, 'i')) }
    });
  }

  const jobs = await query;

  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: { jobs }
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(200).send({
    status: 'success',
    data: { job }
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    return next(new AppError('Cant find the job with this id', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
