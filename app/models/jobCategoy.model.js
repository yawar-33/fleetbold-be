const mongoose = require('mongoose');

const jobCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
    inActive: {
    type: Boolean,
    required: false,
  },
}); 

const JobCategory = mongoose.model('jobCategory', jobCategorySchema);

module.exports = JobCategory;
