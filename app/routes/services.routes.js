const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/services.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the service-related routes
router.get('/', verifyAccessToken, controller.getAllServices);
router.post('/', verifyAccessToken, controller.createService);
router.put('/', verifyAccessToken, controller.updateService);
router.delete('/:id', verifyAccessToken, controller.deleteService);

module.exports = router;
