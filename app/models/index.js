const mongoose = require('mongoose');

// Set the Mongoose promise implementation to use the global Promise object
mongoose.Promise = global.Promise;

// Create an object to hold the Mongoose instance, user model, role model, and roles array
const db = {};

// Assign the Mongoose instance to the db object
db.mongoose = mongoose;

// Import and assign the user and role models to the db object
db.user = require('./user.model');
db.role = require('./role.model');
db.service= require('./services.model');
db.membershipBenefits= require('./membershipBenefits.model');
db.howItWorks= require('./howItWorks.model');
db.testimonial= require('./testimonial.model');
module.exports = db;
