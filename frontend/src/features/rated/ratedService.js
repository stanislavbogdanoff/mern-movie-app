import axios from 'axios'

const API_URL = '/api/rated/'

//  Get user rated

const getRated = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//  Add user rated

const addRated = async (ratedData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, ratedData, config)
  return response.data
}

//  Edit user rated

const editRated = async (ratedId, userRating, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.patch(API_URL + ratedId, userRating, config)
  return response.data
}

//  Delete rated

const deleteRated = async (ratedId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + ratedId, config)
  return response.data
}

const ratedService = {
  getRated,
  addRated,
  editRated,
  deleteRated
}

export default ratedService