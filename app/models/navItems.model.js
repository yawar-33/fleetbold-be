const mongoose = require('mongoose');

const navItemSchema = new mongoose.Schema({
  label: { type: String, required: true },         // e.g., "Features"
  url: { type: String, required: true },           // e.g., "/features"
  order: { type: Number, required: true },         // e.g., 1, 2, 3
  inActive: { type: Boolean, default: false },        // Show/hide item
});

const NavItems = mongoose.model('navItems', navItemSchema);

module.exports = NavItems;