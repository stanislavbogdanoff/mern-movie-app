import React from 'react'
import { 
  useGetTrendingQuery, 
  useGetTopRatedQuery, 
  useGetActionMoviesQuery,
  useGetComedyMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetRomanceMoviesQuery,
  useGetDocumentariesQuery 
} from '../../features/api/apiSlice'

import MovieRow from '../../components/MovieRow/MovieRow'
import Banner from '../../components/Banner/Banner'

import './HomePage.css'

const HomePage = () => {

  const { data, isFetching } = useGetTrendingQuery()
  const { data: topData } = useGetTopRatedQuery()
  const { data: actionData } = useGetActionMoviesQuery()
  const { data: comedyData } = useGetComedyMoviesQuery()
  const { data: horrorData } = useGetHorrorMoviesQuery()
  const { data: romanceData } = useGetRomanceMoviesQuery()
  const { data: documentaryData } = useGetDocumentariesQuery()

  const trendingList = data?.results
  const topList = topData?.results
  const actionList = actionData?.results
  const comedyList = comedyData?.results
  const horrorList = horrorData?.results
  const romanceList = romanceData?.results
  const documentaryList = documentaryData?.results

  const randomMovie = Math.floor(Math.random()*20)

  return (
    <main className="homepage">
      {
        topList && <Banner data={topList[randomMovie]} />
      }
      <div className="movie-list">
        {
          trendingList && <MovieRow title='Trending' moviesList={trendingList} ind={'row-trending'} />
        }
        {
          topList && <MovieRow title='Top Rated' moviesList={topList} ind={'row-top'} />
        }
        {
          actionList && <MovieRow title='Action' moviesList={actionList} ind={'row-action'} />
        }
        {
          comedyList && <MovieRow title='Comedy' moviesList={comedyList} ind={'row-comdey'} />
        }
        {
          horrorList && <MovieRow title='Horror' moviesList={horrorList} ind={'row-horror'} />
        }
        {
          romanceList && <MovieRow title='Romance' moviesList={romanceList} ind={'row-romance'} />
        }
        {
          documentaryList && <MovieRow title='Documentary' moviesList={documentaryList} ind={'row-docum'} />
        }
      </div>
    </main>
  )
}

export default HomePage