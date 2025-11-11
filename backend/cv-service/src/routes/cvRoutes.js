// cv-service/src/routes/cvRoutes.js
const express = require('express');
const {
  uploadCV,
  getUserCVs,
  getCVById,
  getCVAnalysis,
  deleteCV,
  getCareerRoadmap
} = require('../controllers/cvController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Toutes les routes sont protégées
router.use(protect);

router.post('/upload', upload.single('cv'), uploadCV);
router.get('/', getUserCVs);
router.get('/:id', getCVById);
router.get('/:id/analysis', getCVAnalysis);
router.get('/:id/roadmap', getCareerRoadmap);
router.delete('/:id', deleteCV);

module.exports = router;