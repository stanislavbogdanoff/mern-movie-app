import React from 'react'

import MovieCard from './MovieCard'

import './MovieRow.css'

const MovieRow = ({title, moviesList, ind}) => {

  return (
    <section>
    
      <h2 className="row-title">
        {title}
      </h2>

      <div className="row-box">

        <div className="movies-row" id={ind}>

          {
            moviesList?.map(movie => {
              return (
                <MovieCard movie={movie} key={movie.id}/>
              )
            })
          }

        </div>

      </div>

    </section>
  )
}

export default MovieRow
