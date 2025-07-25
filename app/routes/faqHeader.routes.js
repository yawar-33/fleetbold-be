
const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/faqHeader.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// the service-related routes
router.get('/faq-section', controller.getCompleteFAQSection
    
);

// Header management only
router.get('/faq-header', controller.getHeader);
router.put('/faq-header', controller.updateHeader);

// Optional: Manual reordering of benefits
router.put('/faq/reorder', controller.reorderBenefits);



module.exports = router;











