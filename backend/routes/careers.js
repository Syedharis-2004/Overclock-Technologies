const express = require('express');
const {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  reorderCareers
} = require('../controllers/careers');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(getCareers)
  .post(protect, authorize('admin'), createCareer);

router
  .route('/reorder')
  .put(protect, authorize('admin'), reorderCareers);

router
  .route('/:id')
  .get(getCareer)
  .put(protect, authorize('admin'), updateCareer)
  .delete(protect, authorize('admin'), deleteCareer);

module.exports = router;
