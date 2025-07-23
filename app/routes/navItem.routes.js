const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/navItems.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the service-related routes
router.get('/', verifyAccessToken, controller.getAllNavItems);
router.post('/', verifyAccessToken, controller.createNavItem);
router.put('/', verifyAccessToken, controller.updateNavItem);
router.delete('/:id', verifyAccessToken, controller.deleteNavItem);
router.get('/public/getAll', controller.getAllNavItems);

module.exports = router;
