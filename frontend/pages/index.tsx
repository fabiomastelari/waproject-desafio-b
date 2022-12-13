import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList'
import { Movie } from '../otp/movie'
import { Axios, AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/router'

const IndexPage = (): React.ReactElement => {
  const router = useRouter()
  const pageFromQuery = router.query.page
  const [page, setPage] = useState<number>(1)
  const [apiToken, setApitoken] = useState<string>('')
  const [lastPage, setLastPage] = useState<number>(1)
  const [movies, setMovies] = useState<Movie[]>([])
  useEffect(() => {
    const parsedPage = pageFromQuery !== undefined && !Array.isArray(pageFromQuery) ? parseInt(pageFromQuery, 10) : 1

    if (parsedPage !== page) {
      setPage(parsedPage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromQuery])

  useEffect(() => {
    if (process.env.DISABLED_AUTH0 === undefined || !process.env.DISABLED_AUTH0) {
      const axiosRequestConfig: AxiosRequestConfig = {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
      };

      const getTokenData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_CLIENT_ID !== undefined ? process.env.AUTH0_CLIENT_ID :'',
        client_secret: process.env.AUTH0_CLIENT_SECRET !== undefined ? process.env.AUTH0_CLIENT_SECRET : '',
        audience: process.env.AUTH0_CLIENT_AUDIENCE !== undefined ? process.env.AUTH0_CLIENT_AUDIENCE : ''
      })

      const axiosInstance = new Axios(axiosRequestConfig)
      axiosInstance.post(`${process.env.AUTH0_ISSUER_URI !== undefined ? process.env.AUTH0_ISSUER_URI :'/'}oauth/token`, getTokenData).then(function (response) {
        if (response.data !== undefined) {
          const getTokenResponseData = JSON.parse(response.data)  
          setApitoken(getTokenResponseData.access_token)
        } else {
          console.error("Unable to get API Access Token")
        }
      }).catch(function (error) {
          console.error(error);
      });
    }
  }, [])

  useEffect(() => {
    if (apiToken!=='' || (process.env.DISABLED_AUTH0 !== undefined && process.env.DISABLED_AUTH0)) {
      const requestHeaders: Record<string, any> = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'utf8',
      }

      if(!(process.env.DISABLED_AUTH0 !== undefined && process.env.DISABLED_AUTH0) && apiToken!=='') {
        requestHeaders.authorization = `Bearer ${apiToken}`
      }

      const axiosRequestConfig: AxiosRequestConfig = {
        headers: requestHeaders,
        responseType: 'json',
        responseEncoding: 'utf8',
      }
      const axiosInstance = new Axios(axiosRequestConfig)
      axiosInstance
        .get<string>(`${ process.env.API_URL !== undefined ? process.env.API_URL : 'http://localhost:3000' }/movies?page=${page}`)
        .then((getMoviesResponse) => {
          const retrievedMovies: Movie[] = []
          if (getMoviesResponse.data !== undefined) {
            const getMoviesResultDataObj = JSON.parse(getMoviesResponse.data)
            const moviesFromResultDataObj = getMoviesResultDataObj.movies
            const moviesCountFromResultDataObj =
              getMoviesResultDataObj.movieTotalCount
            const numberOfEntireFilledMoviePages = Math.floor(
              moviesCountFromResultDataObj / 10
            )
            const calculatedLastPage = numberOfEntireFilledMoviePages * 10 === moviesCountFromResultDataObj ? numberOfEntireFilledMoviePages : numberOfEntireFilledMoviePages + 1
            if (calculatedLastPage !== lastPage) {
              setLastPage(calculatedLastPage)
            }
            if (moviesFromResultDataObj !== undefined && Array.isArray(moviesFromResultDataObj) && moviesFromResultDataObj.length > 0) {
              for (const rawMovieFromGetMovies of moviesFromResultDataObj) {
                const retrievedMovie: Movie = {
                  id: rawMovieFromGetMovies.id,
                  title: rawMovieFromGetMovies.title,
                  banner: rawMovieFromGetMovies.banner,
                  description: rawMovieFromGetMovies.description,
                  director: rawMovieFromGetMovies.director,
                  producer: rawMovieFromGetMovies.producer,
                }
                retrievedMovies.push(retrievedMovie)
              }
            }
          }
          setMovies(retrievedMovies)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, apiToken])
  return (
    <Layout page={page} lastPage={lastPage} apiToken={apiToken}>
      <MovieList movies={movies}/>
    </Layout>
  )
}
export default IndexPage
