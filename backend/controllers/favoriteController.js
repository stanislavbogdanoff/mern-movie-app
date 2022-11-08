const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Favorite = require('../models/favoriteModel')

//@desc   Get user favorites
//@route  GET /api/favorites
//@access Private

const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id })
  res.status(200).json(favorites)
})

//@desc   Add favorite
//@route  POST /api/favorites
//@access Private

const addFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.create({
    user: req.user.id,
    movieId: req.body.movieId,
    title: req.body.title,
    posterUrl: req.body.posterUrl,
    year: req.body.year,
    rating: req.body.rating,
    votes: req.body.votes
  })
  res.status(200).json(favorite)
})

//@desc   Delete favorite
//@route  DELETE /api/favorites/:id
//@access Private

const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)

  if (!favorite) {
    res.status(400)
    throw new Error('Favorite not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await favorite.delete()

  res.status(200).json({ id: req.params.id })
})

//@desc   Rate favorite
//@route  PATCH /api/favorites/:id
//@access Private

const rateFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id)

  if (!favorite) {
    res.status(400)
    throw new Error('Favorite not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (favorite.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const ratedFavorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(ratedFavorite)
})


module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
  rateFavorite
}