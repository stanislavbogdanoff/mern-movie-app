const express = require('express')
const router = express.Router()
const {
  getReviews,
  addReview,
  deleteReview,
} = require('../controllers/reviewController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReviews).post(protect, addReview)
router.route('/:id').delete(protect, deleteReview)

module.exports = router