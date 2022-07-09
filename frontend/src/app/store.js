import { configureStore } from "@reduxjs/toolkit";

import { movieApi } from '../features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer
  }
})