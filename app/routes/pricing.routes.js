const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/pricing.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the service-related routes
router.get('/', verifyAccessToken, controller.getAllPricingPlan);
router.post('/', verifyAccessToken, controller.createPricingPlan);
router.put('/', verifyAccessToken, controller.updatePricingPlan);
router.delete('/:id', verifyAccessToken, controller.deletePricingPlan);
router.get('/public/getAll', controller.getAllPricingPlan);

module.exports = router;
