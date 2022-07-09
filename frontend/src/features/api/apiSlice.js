import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://api.themoviedb.org/3'
const API_KEY = 'dbcdf50a48db1570f49608447baf5d2b'

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getTrending: builder.query({
      query: () => `/trending/all/week?api_key=${API_KEY}&language=en-US`
    }),
    getTopRated: builder.query({
      query: () => `/movie/top_rated?api_key=${API_KEY}&language=en-US`
    }),
    getActionMovies: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&with_genres=28`
    }),
    getComedyMovies: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&with_genres=35`
    }),
    getHorrorMovies: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&with_genres=27`
    }),
    getRomanceMovies: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&with_genres=10749`
    }),
    getDocumentaries: builder.query({
      query: () => `/discover/movie?api_key=${API_KEY}&with_genres=99`
    }),
    getMovieDetails: builder.query({
      query: (movieId) => `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    }),
    getSimilarMovies: builder.query({
      query: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    }),
    getCrew: builder.query({
      query: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    }),
    getMovieByName: builder.query({
      query: (searchString) => `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchString}`
    })
  })
})

export const {
  useGetTrendingQuery,
  useGetTopRatedQuery,
  useGetActionMoviesQuery,
  useGetComedyMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetRomanceMoviesQuery,
  useGetDocumentariesQuery,
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery,
  useGetCrewQuery,
  useGetMovieByNameQuery
} = movieApi