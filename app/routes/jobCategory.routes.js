const express = require('express');
const jobCategoryController = require('../controllers/jobCategory.controller');
const {verifyAccessToken} = require('../middlewares/auth-jwt');

const router = express.Router();

router.post('/create',verifyAccessToken, jobCategoryController.createJobCategory);
router.put('/update', verifyAccessToken,jobCategoryController.updateJobCategory);
router.delete('/delete/:id',verifyAccessToken, jobCategoryController.deleteJobCategory);
router.get('/all', jobCategoryController.getAllJobCategories);
router.get('/with-count', jobCategoryController.getJobCategoriesWithCount);
router.get('/:id', jobCategoryController.getJobCategoryById);

// New route to seed job categories
router.post('/seed', verifyAccessToken, jobCategoryController.seedJobCategories);

module.exports = router; 