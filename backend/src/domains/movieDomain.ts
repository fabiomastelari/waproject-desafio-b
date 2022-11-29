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
