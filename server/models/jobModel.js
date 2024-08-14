const mongoose = require('mongoose');
const validator = require('validator');

const jobSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Name is required']
  },
  logo: {
    type: String,
    validate: [validator.isURL, 'Enter a valid URL'],
    required: [true, 'Logo is required']
  },
  jobPosition: {
    type: String,
    required: [true, 'Job Positon is required']
  },
  monthlySalary: {
    type: String,
    default: null,
    required: [true, 'Monthly salary is required']
  },
  jobType: {
    type: String,
    enum: ['Fulltime', 'Part time', 'Temporary'],
    required: [true, 'Job type is required']
  },
  category: {
    type: String,
    enum: ['Remote', 'Office'],
    required: [true, 'Category is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  about: {
    type: String,
    required: [true, 'About is required']
  },
  skills: {
    type: [String],
    default: [],
    required: [true, 'Skill are required']
  },
  information: {
    type: String,
    required: [true, 'Information is required']
  },
  createdBy: mongoose.ObjectId,
  createdAt: Date
});

jobSchema.pre('save', function(next) {
  this.skills = [...this.skills[0].split(',').map(el => el.trim())];
  this.createdAt = Date.now();

  next();
});

jobSchema.pre('updateOne', function(next) {
  const data = this.getUpdate();
  if (data.skills) {
    data.skills = data.skills.split(',').map(el => el.trim());
  }

  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
