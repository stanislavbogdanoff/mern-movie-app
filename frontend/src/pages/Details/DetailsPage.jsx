import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'
import { useGetMovieDetailsQuery, useGetSimilarMoviesQuery, useGetCrewQuery } from '../../features/api/apiSlice'

import MovieRow from '../../components/MovieRow/MovieRow'
import CastMember from '../../components/CastMember/CastMember'
import Details from '../../components/Details/Details'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

import { CaretRightOutlined, ArrowDownOutlined } from '@ant-design/icons'

import './DetailsPage.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const DetailsPage = () => {  
  const {id} = useParams()
  const { data, isFetching } = useGetMovieDetailsQuery(id)
  const { data: similarList } = useGetSimilarMoviesQuery(id)
  const { data: crew } = useGetCrewQuery(id)

  const imageUrl = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`

  const [showTrailer, setShowTrailer] = useState(false)
  const [detailsPage, setDetailsPage] = useState(0)

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    });
  }, [])

  const scrollToContent = () => {
    let height = window.innerHeight
    window.scrollTo({
      top: height,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <section className="detailspage">
        
      <div className="details-poster" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <span onClick={scrollToContent} className="scroll-icon bounce"><ArrowDownOutlined style={{color: '#fff', fontSize: '50px'}} /></span>
      <ProgressBar />

      <div className="poster-overlay">

        <div className="poster-info">

          <div className="poster-img">

            <img src={`${baseUrl}${data?.poster_path}`} alt={data?.title} />

          </div>

          <div className="poster-content">

            <div className="title">
              <h2>{data?.title}</h2>
              <p>{data?.release_date.slice(0, 4)}</p>
              {data?.original_title !== data?.title && <i>/ {data?.original_title}</i>}
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

            <button 
              onClick={() => setShowTrailer(!showTrailer)} 
              className='play-btn'
            >
              <CaretRightOutlined />
              Trailer
            </button>

          </div>

        </div>

        {
          showTrailer && (
            <div className="trailer">
              <YouTube videoId={data?.videos?.results?.filter(({name}) => name.includes('Trailer'))[0].key} opts={opts} />
            </div>
          )
        }

        <div className="similar-row">
          <MovieRow title='Similar movies' moviesList={similarList?.results} ind='row-similar' />
        </div>

      </div>

    </section>
  )
}

export default DetailsPage