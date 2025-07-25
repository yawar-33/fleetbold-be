const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  badge: { type: String, default: '' },
  headline: { type: String, required: true },
  subheadline: { type: String, required: true },
  buttonText: { type: String, default: 'Get Started' },
  buttonLink: { type: String, default: '#' },  // e.g., download link or route
  inActive: { type: Boolean, default: false },
});
const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

module.exports = HeroSection;