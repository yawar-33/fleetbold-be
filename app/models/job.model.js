const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  aboutCompany: {
    type: String,
  },
  aboutRole: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  jobResponsibilities: {
    type: String,
  },
  whatWeOffer: {
    type: String,
  },
  jobLocation: {
    type: String,
    enum: ['ONSITE', 'REMOTE', 'HYBRID'],
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-time', 'Permanent'],
    required: true,
  },
  category:
      {
        type: mongoose.Types.ObjectId,
        ref: "jobCategory",
      },
    inActive: {
    type: Boolean,
  },
}); 

const Job = mongoose.model('job', jobSchema);

module.exports = Job;
