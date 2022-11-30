import datasource from '../datasource'
import { Movie } from '../entity/movie'

export interface RawMovie {
  id?: number
  title: string
  banner: string
  description: string
  director: string
  producer: string
}

export interface SyncMoviesReturn {
  movies_added: number
}
export default class MovieDomain {
  public async getMovie (movieId: number): Promise<RawMovie | null> {
    const movieRepository = datasource.getRepository(Movie)
    const movieFromId = await movieRepository.findOneBy({
      id: movieId
    })
    if (movieFromId !== null) {
      return {
        id: movieFromId.id,
        title: movieFromId.title,
        banner: movieFromId.banner,
        description: movieFromId.description,
        director: movieFromId.director,
        producer: movieFromId.producer
      }
    }
    return null
  }

  public async listMovies (page: number, pageSize: number): Promise<RawMovie[]> {
    const listMoviesReturn: RawMovie[] = []
    const movieRepository = datasource.getRepository(Movie)
    const movies = await movieRepository.find({
      order: { title: 'ASC' },
      take: pageSize,
      skip: page > 1 ? (page - 1) * pageSize : 0
    })

    for (const movie of movies) {
      listMoviesReturn.push({
        id: movie.id,
        title: movie.title,
        banner: movie.banner,
        description: movie.description,
        director: movie.director,
        producer: movie.producer
      })
    }
    return listMoviesReturn
  }

  public async syncMovies (movies: RawMovie[]): Promise<SyncMoviesReturn> {
    let moviesAdded = 0
    const movieRepository = datasource.getRepository(Movie)
    for (const movie of movies) {
      const movieFromTitle = await movieRepository.findOneBy({
        title: movie.title
      })
      if (movieFromTitle === null) {
        const newMovie: Partial<Movie> = {
          title: movie.title,
          banner: movie.banner,
          description: movie.description,
          director: movie.director,
          producer: movie.producer
        }
        await movieRepository.save(newMovie)
        moviesAdded++
      }
    }
    return {
      movies_added: moviesAdded
    }
  }
}
