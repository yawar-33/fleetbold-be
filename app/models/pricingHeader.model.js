const mongoose = require('mongoose');

const pricingHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'Pricing with No Hidden Fees'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'Our modern design, real-time insights, and seamless tools deliver the control and confidence you need to scale. No long-term commitments, surprise charges, or setup costs—just clarity and performance.'
  },
  
  // Reference to membership benefits (your existing model)
  pricingList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pricing'
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

const PricingHeader = mongoose.model('pricingHeader', pricingHeaderSchema);
module.exports = PricingHeader;