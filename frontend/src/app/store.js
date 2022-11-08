import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import favoriteReducer from '../features/favorites/favoriteSlice'
import ratedReducer from '../features/rated/ratedSlice'

import { movieApi } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
    rated: ratedReducer,
    [movieApi.reducerPath]: movieApi.reducer
  }
})