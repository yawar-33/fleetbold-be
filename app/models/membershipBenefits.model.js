const mongoose = require('mongoose');

const membershipBenefitsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
}); 

const MembershipBenefits = mongoose.model('membershipBenefits', membershipBenefitsSchema);

module.exports = MembershipBenefits;
