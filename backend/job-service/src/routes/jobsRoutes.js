// jobs-service/src/routes/jobsRoutes.js - MODIFIER
const express = require('express');
const {
  getAllJobs,
  getMatchingJobsForUser,
  getJobDetails,
  applyToJob,
  getApplicationHistory,
  saveJob,
  getJobsStats,
  getJobCategories,
  // AJOUTER CES IMPORTS
  createJob,
  updateJob,
  deleteJob,
  getApplicationDetails,
  updateApplicationStatus,
  addApplicationCommunication
} = require('../controllers/jobsController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/categories', getJobCategories);
router.get('/', getAllJobs);
router.get('/:id', getJobDetails);

// Routes protégées
router.use(protect);

router.get('/user/matching', getMatchingJobsForUser);
router.get('/user/applications', getApplicationHistory);
router.get('/user/applications/:id', getApplicationDetails); // NOUVEAU
router.get('/user/stats', getJobsStats);
router.post('/:id/apply', applyToJob);
router.post('/:id/save', saveJob);

// Routes pour recruteurs/admins - AJOUTER
router.post('/', authorizeRoles('recruiter','admin'), createJob);
router.put('/:id', authorizeRoles('recruiter','admin'), updateJob);
router.delete('/:id', authorizeRoles('recruiter','admin'), deleteJob);
router.patch('/applications/:id/status', authorizeRoles('recruiter','admin'), updateApplicationStatus);
router.post('/applications/:id/communication', authorizeRoles('recruiter','admin'), addApplicationCommunication);

module.exports = router;