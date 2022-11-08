import axios from 'axios'

const API_URL = '/api/favorites/'

//  Get user favorites

const getFavorites = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Add new favorite

const addFavorite = async (favoriteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, favoriteData, config)
  return response.data
}

//  Delete favorite

const deleteFavorite = async (favoriteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + favoriteId, config)
  return response.data
}

//  Rate favorite 

const rateFavorite = async (favoriteId, userRating, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.patch(API_URL + favoriteId, userRating, config)
  return response.data
}

const favoriteService = {
  addFavorite,
  getFavorites,
  deleteFavorite,
  rateFavorite
}

export default favoriteService