const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema(
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
    posterUrl: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    votes: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Favorite', favoriteSchema)