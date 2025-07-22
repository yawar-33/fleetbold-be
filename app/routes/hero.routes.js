 const express = require('express');
 const {authJwt} = require('../middlewares');
 const controller = require('../controllers/hero.controller');
 const router = express.Router();
 const {verifyAccessToken} = require('../middlewares/auth-jwt');
 
 // Define authentication middleware for user roles
 const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
 const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];
 
 // Define the service-related routes
 router.get('/', verifyAccessToken, controller.getAllHeroSections);
 router.post('/', verifyAccessToken, controller.createHeroSection);
 router.put('/', verifyAccessToken, controller.updateHeroSection);
 router.delete('/:id', verifyAccessToken, controller.deleteHeroSection);
 router.get('/public/getAll', controller.getAllHeroSections);
 
 module.exports = router;
 