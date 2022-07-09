import React from 'react'
import { Link } from 'react-router-dom'
import './MovieRow.css'

import defaultImg from '../../images/default.jpg'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const MovieSearchCard = ({movie}) => {
  return (
    <Link to={`/details/${movie.id}`}>
      <div className="movie-search-card">
        <img 
          src={movie.poster_path ? `${baseUrl}${movie.poster_path}` : defaultImg} 
          alt={movie.name ? movie.name : movie.title} 
        />
        <div className="movie-search-info">
          <p>{movie.title}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieSearchCard