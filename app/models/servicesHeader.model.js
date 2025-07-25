const mongoose = require('mongoose');

const servicesHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'One Stop Design Solution'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'From web design to branding, our expert team delivers creative solutions that elevate your brand and captivate your audience.'
  },
  
  // Reference to services benefits (your existing model)
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Services'
  }],
  
  // To ensure only one document exists (singleton pattern)
  isActive: {
    type: Boolean,
    default: true,
    unique: true
  }
}, {
  timestamps: true
});

const ServicesHeader = mongoose.model('servicesHeader', servicesHeaderSchema);
module.exports = ServicesHeader;