const mongoose = require('mongoose');

const howItWorksHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'How It Works'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'Our Simple 3-Step Process'
  },
  
  // Reference to services benefits (your existing model)
  howItWorksItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'howItWorks'
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

const HowItWorksHeader = mongoose.model('howItWorksHeader', howItWorksHeaderSchema);
module.exports = HowItWorksHeader;