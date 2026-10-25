const express = require('express');
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeam
} = require('../controllers/team');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(getTeamMembers)
  .post(protect, authorize('admin'), createTeamMember);

router
  .route('/reorder')
  .put(protect, authorize('admin'), reorderTeam);

router
  .route('/:id')
  .get(getTeamMember)
  .put(protect, authorize('admin'), updateTeamMember)
  .delete(protect, authorize('admin'), deleteTeamMember);

module.exports = router;
