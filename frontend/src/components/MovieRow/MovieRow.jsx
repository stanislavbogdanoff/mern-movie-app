import React, { useEffect } from 'react'

import MovieCard from './MovieCard'

import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons'

import './MovieRow.css'

const MovieRow = ({title, moviesList, ind}) => {

  const movieRow = document.getElementById(`${ind}`)

  const scrollLeft = (e) => {
    e.preventDefault()
    movieRow.scrollBy({
      top: 0,
      left: -630,
      behavior: 'smooth'
    })
  }

  const scrollRight = (e) => {
    e.preventDefault()
    movieRow.scrollBy({
      top: 0,
      left: 630,
      behavior: 'smooth'
    })
  }

  return (
    <section>
    
      <h2 className="row-title">
        {title}
      </h2>

      <div className="row-box">

        <button onClick={scrollLeft} id='left'>
          <CaretLeftFilled />
        </button>

        <div className="movies-row" id={ind}>

          {
            moviesList?.map(movie => {
              return (
                <MovieCard movie={movie} key={movie.id}/>
              )
            })
          }

        </div>

        <button onClick={scrollRight} id='right'>
          <CaretRightFilled />
        </button>

      </div>

    </section>
  )
}

export default MovieRow
