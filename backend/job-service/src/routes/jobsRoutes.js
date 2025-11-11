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
const { protect } = require('../middleware/auth');

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
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.patch('/applications/:id/status', updateApplicationStatus);
router.post('/applications/:id/communication', addApplicationCommunication);

module.exports = router;