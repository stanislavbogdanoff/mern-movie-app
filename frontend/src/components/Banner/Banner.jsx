import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownOutlined } from '@ant-design/icons'

import './Banner.css'

const baseUrl = 'https://image.tmdb.org/t/p/original'

const Banner = ({data}) => {
  console.log(data)
  const imageUrl = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`

  const scrollToContent = () => {
    let height = window.innerHeight
    window.scrollTo({
      top: height,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className='banner' style={{ backgroundImage: `url(${imageUrl})` }}>
      <span onClick={scrollToContent} className="scroll-icon bounce"><ArrowDownOutlined style={{color: '#fff', fontSize: '50px'}} /></span>
      <div className="banner-overlay">

      <div className="poster-info">

        <div className="poster-img">

          <img src={`${baseUrl}${data?.poster_path}`} alt={data?.title} />

        </div>

        <div className="poster-content">

          <div className="title">
            <h2>{data?.title}</h2>
            <p>{data?.release_date.slice(0, 4)}</p>
            {data?.original_title !== data?.title && <i>/ {data?.original_title}</i>}
          </div>

          {
            data?.overview && <p className='overview'>{data?.overview.length > 500 ? data?.overview.substring(0, 500) : data?.overview}</p>
          }

          {
            data?.tagline && <i>"{data?.tagline}"</i>
          }

          <Link to={`/details/${data?.id}`}>
            <button 
              className='play-btn'
            >
              More
            </button>
          </Link>

        </div>

        </div>


      </div>
    </div>
  )
}

export default Banner