const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },            // e.g. "Starter Plan"
  price: { type: String, required: true },            // e.g. "$9.99/month"
  description: { type: String, default: '' },         // e.g. "FREE TRIAL for 30 days"
  features: [{ type: String }],                       // List of features      // true or false
  
});

const Pricing = mongoose.model('Pricing', pricingPlanSchema);

module.exports = Pricing;