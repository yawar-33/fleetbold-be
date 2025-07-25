
const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/membershipHeader.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// the service-related routes
router.get('/membership-section', controller.getCompleteMembershipSection);

// Header management only
router.get('/membership-header', controller.getHeader);
router.put('/membership-header', controller.updateHeader);

// Optional: Manual reordering of benefits
router.put('/membership-benefits/reorder', controller.reorderBenefits);



module.exports = router;











