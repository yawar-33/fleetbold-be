 const express = require('express');
 const {authJwt} = require('../middlewares');
 const controller = require('../controllers/testimonial.controller');
 const router = express.Router();
 const {verifyAccessToken} = require('../middlewares/auth-jwt');
 
 // Define authentication middleware for user roles
 const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
 const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];
 
 // Define the service-related routes
 router.get('/', verifyAccessToken, controller.getAllTestimonial);
 router.post('/', verifyAccessToken, controller.createTestimonial);
 router.put('/', verifyAccessToken, controller.updateTestimonial);
 router.delete('/:id', verifyAccessToken, controller.deleteTestimonial);
 router.get('/public/getAll', controller.getAllTestimonial);
 
 module.exports = router;
 