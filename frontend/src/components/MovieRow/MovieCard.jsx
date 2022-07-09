import React from 'react'
import { Link } from 'react-router-dom'
import './MovieRow.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const MovieCard = ({movie}) => {
  return (
    <Link to={`/details/${movie.id}`}>
      <div className="movie-card">
        <img src={`${baseUrl}${movie.poster_path}`} alt={movie.name ? movie.name : movie.title} />
      </div>
    </Link>
  )
}

export default MovieCard