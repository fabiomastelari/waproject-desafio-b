import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface StudioGhibliMovie {
  title: string
  movie_banner: string
  description: string
  director: string
  producer: string
}

const MANDATORY_RAW_MOVIE_FIELDS_FROM_GET = [
  'title',
  'description',
  'movie_banner',
  'director',
  'producer'
]

export default class StudioGhibliDomain {
  public async getTop50Movies (): Promise<StudioGhibliMovie[]> {
    const retrievedMovies: StudioGhibliMovie[] = []
    const axiosRequestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'utf8'
      },
      responseType: 'json',
      responseEncoding: 'utf8'
    }
    const axiosInstance = new Axios(axiosRequestConfig)
    const getMoviesResponse = await axiosInstance.get<string>('https://ghibliapi.herokuapp.com/films?limit=50')
    if (getMoviesResponse.data !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const getMoviesResultDataObj = JSON.parse(getMoviesResponse.data)
      if (Array.isArray(getMoviesResultDataObj) && getMoviesResultDataObj.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const getMoviesResultDataArrayObj: Array<Record<string, string>> = getMoviesResultDataObj
        for (const rawMovieFromGetMovies of getMoviesResultDataArrayObj) {
          if (rawMovieFromGetMovies.url !== undefined) {
            const getMovieResponse = await axiosInstance.get<string>(rawMovieFromGetMovies.url)
            if (getMovieResponse.data !== undefined) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const getMovieResultDataObj = JSON.parse(getMovieResponse.data)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              if (MANDATORY_RAW_MOVIE_FIELDS_FROM_GET.every((mandatoryRawMovieField) => Object.keys(getMovieResultDataObj).some((getMovieResultDataObjKey) => mandatoryRawMovieField === getMovieResultDataObjKey))) {
                const retrievedMovie: StudioGhibliMovie = {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  title: getMovieResultDataObj.title,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  movie_banner: getMovieResultDataObj.movie_banner,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  description: getMovieResultDataObj.description,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  director: getMovieResultDataObj.director,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  producer: getMovieResultDataObj.producer
                }
                retrievedMovies.push(retrievedMovie)
              }
            }
          }
        }
      }
    }
    return retrievedMovies
  }
}
