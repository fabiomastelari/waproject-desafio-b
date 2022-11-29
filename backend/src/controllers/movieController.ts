import MovieDomain, { RawMovie, SyncMoviesReturn } from '../domains/movieDomain'
import StudioGhibliDomain from '../domains/studioGhibliDomain'
import {
  Controller,
  Get,
  Path,
  Query,
  Post,
  Route
} from 'tsoa'

@Route('movies')
export class MovieController extends Controller {
  @Get()
  public async list (
    @Query() page?: number
  ): Promise<RawMovie[]> {
    // const limit = 10
    const listResult: RawMovie[] = []
    // Call movies domain list
    return await Promise.resolve(listResult)
  }

  @Get('{userId}')
  public async get (
    @Path() userId: number
  ): Promise<RawMovie> {
    const getResult: RawMovie = {
      id: 0,
      banner: '',
      description: '',
      director: '',
      producer: '',
      title: ''
    }
    // Call movie domain get
    return await Promise.resolve(getResult)
  }

  @Post('/sync')
  public async sync (): Promise<SyncMoviesReturn> {
    const ghibliDomain = new StudioGhibliDomain()
    const movieDomain = new MovieDomain()
    const top50Movies = await ghibliDomain.getTop50Movies()
    // Calls movies domain sync
    return await movieDomain.syncMovies(top50Movies.map<RawMovie>((top50Movie) => {
      return {
        title: top50Movie.title,
        banner: top50Movie.movie_banner,
        description: top50Movie.description,
        director: top50Movie.director,
        producer: top50Movie.producer
      }
    }))
  }
}
