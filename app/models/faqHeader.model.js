const mongoose = require('mongoose');

const faqHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'Frequently Asked Questions (FAQs)'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'Find the information you need about our services, plans, and processes. If you have more questions, feel free to reach out to us!'
  },
  
  // Reference to services benefits (your existing model)
  faqs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'faq'
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

const FAQHeader = mongoose.model('faqHeader', faqHeaderSchema);
module.exports = FAQHeader;