const mongoose = require('mongoose');

const membershipHeaderSchema = new mongoose.Schema({
  headerTitle: {
    type: String,
    required: true,
    default: 'Membership Benefits'
  },
  headerDescription: {
    type: String,
    required: true,
    default: 'Our membership comes with the promise of endless creativity and dedicated support.'
  },
  
  // Reference to membership benefits (your existing model)
  benefitServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'membershipBenefits'
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

const MembershipHeader = mongoose.model('membershipHeader', membershipHeaderSchema);
module.exports = MembershipHeader;