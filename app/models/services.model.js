const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
    inActive: {
    type: Boolean,
    default: false,
  },
}); 

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
