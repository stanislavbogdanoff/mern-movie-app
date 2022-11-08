const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Review = require('../models/reviewModel')

//@desc   Get user reviews
//@route  GET /api/reviews
//@access Private

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ user: req.user.id })
  res.status(200).json(reviews)
})

//@desc   Add review
//@route  POST /api/reviews
//@access Private

const addReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    user: req.user.id,
    userName: req.user.name,
    movieId: req.body.movieId,
    title: req.body.title,
    text: req.body.text,
    likes: 0
  })
  res.status(200).json(review)
})

//@desc   Delete review
//@route  DELETE /api/reviews/:id
//@access Private

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    res.status(400)
    throw new Error('Review not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (review.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await review.delete()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getReviews,
  addReview,
  deleteReview
}