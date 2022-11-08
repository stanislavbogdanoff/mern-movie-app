import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ratedService from './ratedService'

const initialState = {
  rated: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//  Add new rating
export const addRated = createAsyncThunk(
  'rated/create',
  async (ratedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ratedService.addRated(ratedData, token)
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

//  Get user ratings
export const getRated = createAsyncThunk(
  'rated/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ratedService.getRated(token)
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

//  Edit rating
export const editRated = createAsyncThunk(
  'rated/edit',
  async (ratedData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ratedService.editRated(ratedData.id, { userRating: ratedData.userRating}, token)
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

//  Delete rating
export const deleteRated = createAsyncThunk(
  'rated/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ratedService.deleteRated(id, token) 
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

export const ratedSlice = createSlice({
  name: 'rated',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //  Add new rating
      .addCase(addRated.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addRated.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.rated.push(action.payload)
      })
      .addCase(addRated.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Get all user ratings
      .addCase(getRated.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRated.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.rated = action.payload
      })
      .addCase(getRated.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Delete rating
      .addCase(deleteRated.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRated.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.rated = state.rated.filter(
          (rated) => rated._id !== action.payload.id
        )
      })
      .addCase(deleteRated.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = ratedSlice.actions
export default ratedSlice.reducer