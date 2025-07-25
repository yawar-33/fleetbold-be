
const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/pricingHeader.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// the service-related routes
router.get('/pricing-section', controller.getCompletePricingSection);

// Header management only
router.get('/pricing-header', controller.getHeader);
router.put('/pricing-header', controller.updateHeader);

// Optional: Manual reordering of benefits
router.put('/pricing/reorder', controller.reorderBenefits);



module.exports = router;











