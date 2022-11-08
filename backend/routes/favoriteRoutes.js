const express = require('express')
const router = express.Router()
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
  rateFavorite
} = require('../controllers/favoriteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getFavorites).post(protect, addFavorite)
router.route('/:id').delete(protect, deleteFavorite).patch(protect, rateFavorite)

module.exports = router