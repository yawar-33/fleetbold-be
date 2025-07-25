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
   inActive: {
    type: Boolean,
    default: false,
  },
}); 

const MembershipBenefits = mongoose.model('membershipBenefits', membershipBenefitsSchema);

module.exports = MembershipBenefits;
//const mongoose = require('mongoose');

// // Individual Benefit Item Schema
// const membershipBenefitItemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   icon: {
//     type: String,
//     required: true,
//   },
//    isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Main Membership Benefits Schema
// const membershipBenefitsSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   services: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'MembershipBenefitItem',
//     required: true
//   }],
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Create models
// const MembershipBenefitItem = mongoose.model('MembershipBenefitItem', membershipBenefitItemSchema);
// const MembershipBenefits = mongoose.model('MembershipBenefits', membershipBenefitsSchema);

// module.exports = {
//   MembershipBenefits,
//   MembershipBenefitItem
// };