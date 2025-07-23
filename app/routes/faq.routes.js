 const express = require('express');
 const {authJwt} = require('../middlewares');
 const controller = require('../controllers/faq.controller');
 const router = express.Router();
 const {verifyAccessToken} = require('../middlewares/auth-jwt');
 
 // Define authentication middleware for user roles
 const isModerator = [authJwt.verifyAccessToken, authJwt.isModerator];
 const isAdmin = [authJwt.verifyAccessToken, authJwt.isAdmin];
 
 // Define the service-related routes
 router.get('/', verifyAccessToken, controller.getAllFAQs);
 router.post('/', verifyAccessToken, controller.createFAQ);
 router.put('/', verifyAccessToken, controller.updateFAQ);
 router.delete('/:id', verifyAccessToken, controller.deleteFAQ);
 router.get('/public/getAll', controller.getAllFAQs);
 
 module.exports = router;
 