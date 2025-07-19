const express = require('express');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/howItWorks.controller');
const router = express.Router();
const {verifyAccessToken} = require('../middlewares/auth-jwt');

// Define authentication middleware for user roles
const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];

// Define the service-related routes
router.get('/', verifyAccessToken, controller.getAll);
router.post('/', verifyAccessToken, controller.create);
router.put('/', verifyAccessToken, controller.update);
router.delete('/:id', verifyAccessToken, controller.delete);
router.get('/public/getAll', controller.getAll);

module.exports = router;
