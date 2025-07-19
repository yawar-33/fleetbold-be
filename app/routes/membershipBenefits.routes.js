const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/membershipBenefits.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the service-related routes
router.get('/', verifyAccessToken, controller.getAllBenefits);
router.post('/', verifyAccessToken, controller.createBenefits);
router.put('/', verifyAccessToken, controller.updateBenefits);
router.delete('/:id', verifyAccessToken, controller.deleteBenefits);
router.get('/public/getAll', controller.getAllBenefits);

module.exports = router;
