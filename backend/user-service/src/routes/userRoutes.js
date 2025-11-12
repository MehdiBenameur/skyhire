// user-service/src/routes/userRoutes.js
const express = require('express');
const {
  getProfile,
  updateProfile,
  searchUsers,
  getUserStats,
  getPublicProfile,
  addSkill,
  removeSkill,
  autoCreateProfile,
  getUserById
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Routes protégées
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/stats', protect, getUserStats);
router.post('/skills', protect, addSkill);
router.delete('/skills/:skillId', protect, removeSkill);
router.get('/:userId', protect, getUserById);
// Routes publiques
router.get('/search', searchUsers);
router.get('/public/:userId', getPublicProfile);
router.post('/profile/auto-create', autoCreateProfile);

module.exports = router;