const express = require('express');
const {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolio');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(getPortfolios)
  .post(protect, authorize('admin'), createPortfolio);

router
  .route('/:id')
  .get(getPortfolio)
  .put(protect, authorize('admin'), updatePortfolio)
  .delete(protect, authorize('admin'), deletePortfolio);

module.exports = router;
