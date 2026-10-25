const express = require('express');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  reorderServices
} = require('../controllers/services');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(protect, authorize('admin'), createService);

router
  .route('/reorder')
  .put(protect, authorize('admin'), reorderServices);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), updateService)
  .delete(protect, authorize('admin'), deleteService);

module.exports = router;

