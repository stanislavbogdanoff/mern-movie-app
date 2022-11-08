const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    movieId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', reviewSchema)