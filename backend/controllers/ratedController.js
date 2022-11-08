const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Rated = require('../models/ratedModel')

//@desc   Get user rated
//@route  GET /api/rated
//@access Private

const getRated = asyncHandler(async (req, res) => {
  const rated = await Rated.find({ user: req.user.id })
  res.status(200).json(rated)
})

//@desc   Add rated
//@route  POST /api/rated
//@access Private

const addRated = asyncHandler(async (req, res) => {
  const rated = await Rated.create({
    user: req.user.id,
    movieId: req.body.movieId,
    title: req.body.title,
    posterUrl: req.body.posterUrl,
    userRating: req.body.userRating,
    year: req.body.year,
    rating: req.body.rating,
    votes: req.body.votes
  })
  res.status(200).json(rated)
})

//@desc   Change rating
//@route  PATCH /api/rated/:id
//@access Private

const editRated = asyncHandler(async (req, res) => {
  const rated = await Rated.findById(req.params.id)

  if (!rated) {
    res.status(400)
    throw new Error('Rated not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (rated.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const editedRated = await Rated.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(editedRated)
})

//@desc   Delete rating
//@route  DELETE /api/rated/:id
//@access Private

const deleteRated = asyncHandler(async (req, res) => {
  const rated = await Rated.findById(req.params.id)

  if (!rated) {
    res.status(400)
    throw new Error('Rated not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (rated.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await rated.delete()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getRated,
  addRated,
  editRated,
  deleteRated
}