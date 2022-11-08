import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteFavorite, addFavorite } from '../../features/favorites/favoriteSlice'
import { deleteRated } from '../../features/rated/ratedSlice'
import './MovieRow.css'

import { StarOutlined, StarFilled, PlusOutlined, CheckOutlined } from '@ant-design/icons'

import defaultImg from '../../images/default.jpg'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const WatchlistCard = ({ favorite, rated, favList, rating, movie }) => {

  const dispatch = useDispatch()
  
  const handleDeleteFavorite = () => {
    dispatch(deleteFavorite(movie._id))
  }

  const handleDeleteRated = () => {
    dispatch(deleteRated(movie._id))
  }

  const handleFavorite = () => {
    if (movie) dispatch(addFavorite({movieId: movie?.movieId, title: movie?.title, posterUrl: movie?.posterUrl, year: movie?.year, rating: movie?.rating, votes: movie?.votes}))
  }

  return (
    <div className="watchlist-card">
      
      <img 
        src={movie?.posterUrl ? `${baseUrl}${movie?.posterUrl}` : defaultImg} 
        alt={movie?.title} 
      />

      
      <p id='title'><Link to={`/details/${movie?.movieId}`}>{movie?.title}</Link></p>
      
      <p>{movie.year}</p>
      <p id='rating'> <font><StarOutlined /> {movie.rating}</font> <br /> {movie.votes}</p>

      {rated ? (
        <p style={{color: 'rgb(255, 153, 0)'}}><StarFilled /> {rating ? rating.userRating : movie.userRating}</p>
      ) : (
        <p><StarOutlined/></p>
      )}

      {favorite ? (
        <button onClick={handleDeleteFavorite} className='watchlist-btn' id='favorite-btn'><CheckOutlined /></button>
      ) : (
        <button onClick={handleFavorite} className='watchlist-btn'><PlusOutlined /></button>
      )}

      {favList ? (
        <button onClick={handleDeleteFavorite} className='delete-btn'>X</button>
      ) : (
        <button onClick={handleDeleteRated} className='delete-btn'>X</button>
      )}

    </div>
  )
}

export default WatchlistCard