import MovieDomain, { RawMovie, SyncMoviesReturn } from '../domains/movieDomain'
import StudioGhibliDomain from '../domains/studioGhibliDomain'
import {
  Controller,
  Get,
  Path,
  Query,
  Post,
  Route,
  Res,
  TsoaResponse
} from 'tsoa'

@Route('movies')
export class MovieController extends Controller {
  @Get()
  public async list (
    @Query() page?: number
  ): Promise<RawMovie[]> {
    const movieDomain = new MovieDomain()
    const listResult = await movieDomain.listMovies(page === undefined ? 1 : page, 10)// Call movies domain list
    return listResult
  }

  /**
   * @param notFoundResponse The responder function for a not found response
   */
  @Get('{userId}')
  public async get (
    @Path() userId: number, @Res() notFoundResponse: TsoaResponse<404, { reason: string }>
  ): Promise<RawMovie> {
    const movieDomain = new MovieDomain()
    const getResult = await movieDomain.getMovie(userId)// Call movie domain get
    if (getResult !== null) {
      return getResult
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return notFoundResponse(404, { reason: 'Movie not found' })
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
