const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
    inActive: {
    type: Boolean,
    required: false,
  },
}); 

const FAQs = mongoose.model('faq', faqSchema);

module.exports = FAQs;
