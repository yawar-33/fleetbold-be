const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  image: { type: String, default: '' }, // URL to profile image
  content: { type: String, required: true },
 // isFavorite: { type: Boolean, default: false },
  inActive: { type: Boolean, default: false },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;