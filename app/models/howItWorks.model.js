const mongoose = require('mongoose');

const howItWorksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // icon: {
  //   type: String,
  //   required: true,
  // },
    inActive: {
    type: Boolean,
    required: false,
  },
}); 

const HowItWorks = mongoose.model('howItWorks', howItWorksSchema);

module.exports = HowItWorks;
