const mongoose = require('mongoose');

const testimonialHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'What Our Clients Are Saying'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'Discover how our solutions have transformed businesses and brought visions to life through our clients experiences.'
  },
  
  // Reference to membership benefits (your existing model)
  benefitServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Testimonial'
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

const TestimonialHeader = mongoose.model('testimonialHeader', testimonialHeaderSchema);
module.exports = TestimonialHeader;