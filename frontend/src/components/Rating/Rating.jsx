import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRated, addRated, editRated, reset } from '../../features/rated/ratedSlice'
import ReactStars from "react-rating-stars-component"

import './Rating.css'

const Rating = ({data, movieId, title, posterUrl, year, rating, votes}) => {

  const dispatch = useDispatch()

  const { rated, isLoading, isError, message } = useSelector(
    (state) => state.rated
  )

  useEffect(() => {
    dispatch(getRated())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const [currentMovie, setCurrentMovie] = useState({})
  const [currentRating, setCurrentRating] = useState(0)

  useEffect(() => {
    setCurrentMovie(rated?.filter((rated) => rated?.movieId === data?.id)[0])
    if (data?.id && rated.filter((rated) => rated.movieId === data?.id).length !== 0 ) {
      setCurrentRating(rated.filter((rated) => rated.movieId === data?.id)[0].userRating)
    }
    else {
      setCurrentRating(0)
    }
  }, [rated, data?.id])

  console.log(currentRating)

  const handleRate = (userRating) => {
    dispatch(addRated({movieId, title, posterUrl, userRating, year, rating, votes}))
  }

  const handleEditRated = (userRating) => {
    dispatch(editRated({id: currentMovie?._id, userRating}))
  }

  const ratedOpts = {
    size: 30,
    count: 10,
    isHalf: false,
    value: currentRating,
    color: "grey",
    activeColor: "gold",
    onChange: newValue => {
      handleEditRated(newValue)
    }
  } 
  
  const notRatedOpts = {
    size: 30,
    count: 10,
    isHalf: false,
    value: 0,
    color: "grey",
    activeColor: "gold",
    onChange: newValue => {
      handleRate(newValue)
    }
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="rating-box">
      <span>
        <h4>IMDB Rating: </h4>
        <p>{data?.vote_average}/10</p>
      </span>
      {
        !!currentRating && (
          <span>
            <h4>Your rating for {title}:</h4>
            <ReactStars {...ratedOpts} />
          </span>
        )
      }
      {
        !currentRating && (
          <span>
            <h4>Rate {title}:</h4>
            <ReactStars {...notRatedOpts} />
          </span>
        )
      }
    </div>
  )
}

export default Rating