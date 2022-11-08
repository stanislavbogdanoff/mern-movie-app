import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import favoriteService from './favoriteService'

const initialState = {
  favorites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//  Add new favorite
export const addFavorite = createAsyncThunk(
  'favorites/create',
  async (favoriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.addFavorite(favoriteData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Get user favorites
export const getFavorites = createAsyncThunk(
  'favorites/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.getFavorites(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Delete favorite
export const deleteFavorite = createAsyncThunk(
  'favorites/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.deleteFavorite(id, token) 
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Rate favorite
export const rateFavorite = createAsyncThunk(
  'favorites/rate',
  async (favoriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoriteService.rateFavorite(favoriteData.id, { userRating: favoriteData.userRating}, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //  Add new favorite
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites.push(action.payload)
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Get all user favorites
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Delete favorite
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = state.favorites.filter(
          (favorite) => favorite._id !== action.payload.id
        )
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = favoriteSlice.actions
export default favoriteSlice.reducer