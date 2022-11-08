import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getFavorites, reset } from '../../features/favorites/favoriteSlice'
import { getRated } from '../../features/rated/ratedSlice'

import WatchlistCard from '../../components/MovieRow/WatchlistCard'

import './DashboardPage.css'

const DashboardPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [dashPage, setDashPage] = useState(0)
  const { user } = useSelector((state) => state.auth)
  const { rated } = useSelector(
    (state) => state.rated
  )
  const { favorites, isLoading, isError, message } = useSelector(
    (state) => state.favorites
  )

  useEffect(() => {
    if (isError) console.log(message)
    if (!user) navigate('/login')
  }, [user, navigate, isError, message])

  useEffect(() => {
    dispatch(getFavorites())
    dispatch(getRated())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  return (

    <main className="dashpage">

      <div className="dash-content">

        <ul className='dash-menu'>
          <li>

            <button 
              onClick={() => setDashPage(0)} 
              className={dashPage === 0 ? 'dash-menu-btn active' : 'dash-menu-btn'}
            >
              Watchlist
            </button>
          </li>

          <li>
            <button 
              onClick={() => setDashPage(1)}
              className={dashPage === 1 ? 'dash-menu-btn active' : 'dash-menu-btn'}
            >
              Ratings
            </button>
          </li>

        </ul>

        {
          dashPage === 0 && 
          <div className="watchlist-box">
            {
              favorites.map((favoriteMovie, index) => {
                return (
                  <WatchlistCard 
                    favorite
                    favList
                    rated={rated.filter((rated) => rated.movieId === favoriteMovie.movieId).length !== 0 ? true : false}
                    rating={rated?.filter((rated) => rated.movieId === favoriteMovie.movieId)[0]}
                    movie={favoriteMovie}
                    key={index}
                  />
                )
              })
            }
          </div>
        }

        {
          dashPage === 1 &&
          <div className="ratings-box">
          {
            rated.map((ratedMovie, index) => {
              return (
                <WatchlistCard
                  favorite={favorites?.filter(favorite => favorite.movieId === ratedMovie.movieId).length !== 0 ? true : false}
                  rated
                  movie={ratedMovie}
                  key={index}
                />
              )
            })
          }
        </div>
        }

      </div>

    </main>

  )
}

export default DashboardPage