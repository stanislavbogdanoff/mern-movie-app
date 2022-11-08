import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieDetailsQuery, useGetSimilarMoviesQuery, useGetCrewQuery } from '../../features/api/apiSlice'

import MovieRow from '../../components/MovieRow/MovieRow'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import MovieInfo from '../../components/MovieInfo/MovieInfo'

import { ArrowDownOutlined } from '@ant-design/icons'

import './DetailsPage.css'

const DetailsPage = () => {  

  const {id} = useParams()
  const { data, isFetching } = useGetMovieDetailsQuery(id)
  const { data: similarList } = useGetSimilarMoviesQuery(id)
  const { data: crew } = useGetCrewQuery(id)

  console.log(data)

  const imageUrl = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`

  // var formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD'
  // })

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

  const movieId = data?.id
  const title = data?.title
  const posterUrl = data?.poster_path
  const year = data?.release_date.slice(0,4)
  const rating = data?.vote_average
  const votes = data?.vote_count

  if (isFetching) return <h1>Loading...</h1>

  return (
    <main className="detailspage">
        
      <div className="details-poster" style={{ backgroundImage: `url(${imageUrl})` }}></div>

      <span onClick={scrollToContent} className="scroll-icon bounce">
        <ArrowDownOutlined style={{color: '#fff', fontSize: '50px'}} />
      </span>
      <ProgressBar />

      <div className="poster-overlay">

        <MovieInfo 
          data={data} 
          crew={crew} 
          movieId={movieId} 
          title={title} 
          posterUrl={posterUrl} 
          year={year} 
          rating={rating} 
          votes={votes} 
        />

        <div className="similar-row">
          <MovieRow title='Similar movies' moviesList={similarList?.results} ind='row-similar' />
        </div>

      </div>

    </main>
  )
}

export default DetailsPage