import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, getFavorites, deleteFavorite, reset } from '../../features/favorites/favoriteSlice'
import YouTube from 'react-youtube'

import Details from '../Details/Details'
import CastMember from '../CastMember/CastMember'
import Rating from '../Rating/Rating'

import { CaretRightOutlined, HeartFilled } from '@ant-design/icons'

import './MovieInfo.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const MovieInfo = ({data, crew, movieId, title, posterUrl, year, rating, votes}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { favorites, isLoading, isError, message } = useSelector(
    (state) => state.favorites
  )

  console.log(favorites)

  useEffect(() => {
    if (isError) console.log(message)
    if (!user) navigate('/login')
  }, [user, navigate, isError, message])

  useEffect(() => {
    dispatch(getFavorites())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  console.log(favorites)

  useEffect(() => {
    if (favorites?.filter(favorite => favorite.movieId === movieId).length !== 0) setIsFavorite(true)
    else setIsFavorite(false)
  }, [favorites, movieId])

  const [detailsPage, setDetailsPage] = useState(0)
  const [showTrailer, setShowTrailer] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  const handleFavorite = () => {
    dispatch(addFavorite({movieId, title, posterUrl, year, rating, votes}))
  }

  const handleDeleteFavorite = () => {
    dispatch(deleteFavorite(favorites?.filter(favorite => favorite.movieId === movieId)[0]._id))
  }

  console.log(data)

  return (
    <>

    <div className="poster-info">

      <div className="poster-small">

        <img src={`${baseUrl}${data?.poster_path}`} alt={data?.title} />

      </div>

      <div className="poster-content">

        <div className="title">
          <h2>{data?.title}</h2>
          <p>{data?.release_date.slice(0, 4)}</p>
          <p>by {crew?.crew.filter(({job}) => job === 'Director')[0].name}</p>
        </div>

        <span className="details-menu">
          <button onClick={() => setDetailsPage(0)} className={detailsPage === 0 ? 'active' : ''}>
            Overview
          </button>
          <button onClick={() => setDetailsPage(1)} className={detailsPage === 1 ? 'active' : ''}>
            Cast
          </button>
          <button onClick={() => setDetailsPage(2)} className={detailsPage === 2 ? 'active' : ''}>
            Details
          </button>
        </span>

        {
          detailsPage === 0 && <p className='overview'>{data?.overview}</p>
        }

        {
          detailsPage === 1 && (
            <div className="cast-box">
              {crew?.cast.map(actor => {
                return (
                  <CastMember name={actor.name} role={actor.character} />
                )
              })}
            </div>
          )
        }

        {
          detailsPage === 2 && (
            <Details 
              title={data?.title}
              origTitle={data?.original_title}
              length={data?.runtime}
              genres={data?.genres} 
              studios={data?.production_companies}  
              countries={data?.production_countries}
              languages={data?.spoken_languages}
            />
          )
        }

        {
          data?.tagline && <i>"{data?.tagline}"</i>
        }

        {
          data && 
          <Rating 
            data={data} 
            movieId={movieId} 
            title={title} 
            posterUrl={posterUrl} 
            year={year} 
            rating={rating} 
            votes={votes}  
          />
        }

        <div className="poster-btn-box">

          <button 
            onClick={() => setShowTrailer(!showTrailer)} 
            className='play-btn'
          >
            <CaretRightOutlined />
            Trailer
          </button>

          <span className="favorite-btn-box">
            {
              !!isFavorite && 
              <button
                onClick={handleDeleteFavorite}
                className='favorite-btn active'
              >
                Unheart<HeartFilled style={{color: 'rgb(255, 85, 55)', fontSize: '30px'}} />
              </button>
            }
            {
              !isFavorite && 
              <button
                onClick={handleFavorite}
                className='favorite-btn'
              >
                Heart<HeartFilled style={{color: 'grey', fontSize: '30px'}} />
              </button>
            }
          </span>

        </div>

      </div>

    </div>

    {
      showTrailer && (
        <div className="trailer">
          <YouTube videoId={data?.videos?.results?.filter(({name}) => name.includes('Trailer'))[0].key} opts={opts} />
        </div>
      )
    }

    </>

  )
}

export default MovieInfo