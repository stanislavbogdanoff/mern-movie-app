import React, { useState } from 'react'

import MovieSearchCard from '../../components/MovieRow/MovieSearchCard'
import './SearchPage.css'

const API_KEY = 'dbcdf50a48db1570f49608447baf5d2b'

const SearchPage = () => {
  const [text, setText] = useState('')
  const [searchedMovies, setSearchedMovies] = useState([])

  const searchString = text.toLowerCase().toLowerCase().replaceAll(" ", "+")

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`)
    .then(response => response.json())
    .then((jsonData) =>   setSearchedMovies(jsonData?.results))
  }

  console.log(searchedMovies)

  return (
    <section className="searchpage">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Enter movie title...'
          onChange={(e => setText(e.target.value))}
          value={text}
          className='search-input'
        />
        <button className='play-btn' type='submit'>Search</button>
      </form>
      <div className="results-box">
        {searchedMovies && searchedMovies.map(movie => {
          return (
            <MovieSearchCard movie={movie} />
          )
        })
        }
      </div>
    </section>
  )
}

export default SearchPage