const express = require('express')
const router = express.Router()
const {
  getRated,
  addRated,
  editRated,
  deleteRated
} = require('../controllers/ratedController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRated).post(protect, addRated)
router.patch('/:id', protect, editRated)
router.delete('/:id', protect, deleteRated)

module.exports = router