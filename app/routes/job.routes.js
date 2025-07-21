const express = require('express');
const jobController = require('../controllers/job.controller');
const { verifyAccessToken } = require('../middlewares/auth-jwt');

const router = express.Router();

router.post('/create', verifyAccessToken, jobController.createJob);
router.put('/update', verifyAccessToken, jobController.updateJob);
router.delete('/delete/:id', verifyAccessToken, jobController.deleteJob);
router.get('/all', jobController.getAllJobs);
router.get('/active/all', jobController.getActiveJobs);
router.get('/search', jobController.searchJobs);
router.get('/category/:categoryId', jobController.getJobsByCategory);
router.get('/location/:jobLocation', jobController.getJobsByLocation);
router.get('/type/:jobType', jobController.getJobsByType);
router.get('/:id', jobController.getJobById);
router.patch('/toggle-status/:id', verifyAccessToken, jobController.toggleJobStatus);

module.exports = router; 