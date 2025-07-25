
const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/testimonialHeader.controller')
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// the service-related routes
router.get('/testimonial-section', controller.getCompleteTestimonialSection);

// Header management only
router.get('/testimonial-header', controller.getHeader);
router.put('/testimonial-header', controller.updateHeader);

// Optional: Manual reordering of benefits
router.put('/testimonial/reorder', controller.reorderBenefits);



module.exports = router;











