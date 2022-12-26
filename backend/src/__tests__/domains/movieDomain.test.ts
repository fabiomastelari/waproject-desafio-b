import { DataSource } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import datasource from '../../datasource'
import MovieDomain, { RawMovie } from '../../domains/movieDomain'
import { Movie } from '../../entity/movie'

describe('Domains::Movie', () => {
  let movieDomainInstance: MovieDomain
  let datasourceInstance: DataSource
  beforeAll(done => {
    datasourceInstance = datasource
    datasourceInstance.initialize()
      .then(() => {
        done()
      })
      .catch((err) => {
        done('Error during Data Source initialization:', err)
      })
  })
  beforeEach(() => {
    movieDomainInstance = new MovieDomain()
  })
  it('Should get expected movie', done => {
    const movieRepository = datasourceInstance.getRepository(Movie)
    const testMovieData: QueryDeepPartialEntity<Movie> = {
      title: 'Test Movie',
      description: 'Test Movie description',
      producer: 'Test Movie producer',
      director: 'Test Movie director',
      banner: 'Test Movie banner url'
    }
    movieRepository.insert(testMovieData)
      .then(insertedMovieResult => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const id: number = insertedMovieResult.identifiers[0].id
        expect(id).toBeDefined()
        expect(typeof id).toEqual('number')
        expect(id).not.toBeNaN()
        movieDomainInstance.getMovie(id)
          .then(movieFromGetMovie => {
            expect(movieFromGetMovie).toBeDefined()
            expect(movieFromGetMovie?.id).toBeDefined()
            expect(movieFromGetMovie?.title).toBeDefined()
            expect(movieFromGetMovie?.description).toBeDefined()
            expect(movieFromGetMovie?.producer).toBeDefined()
            expect(movieFromGetMovie?.director).toBeDefined()
            expect(movieFromGetMovie?.banner).toBeDefined()
            expect(movieFromGetMovie?.id).toEqual(id)
            expect(movieFromGetMovie?.title).toEqual(testMovieData.title)
            expect(movieFromGetMovie?.description).toEqual(testMovieData.description)
            expect(movieFromGetMovie?.producer).toEqual(testMovieData.producer)
            expect(movieFromGetMovie?.director).toEqual(testMovieData.director)
            expect(movieFromGetMovie?.banner).toEqual(testMovieData.banner)
            done()
          })
          .catch((err: unknown) => {
            done(err)
          })
      })
      .catch((err: unknown) => {
        done(err)
      })
  })
  it('Should get expected list of movies deppending of pagination', done => {
    const movieRepository = datasourceInstance.getRepository(Movie)
    const testMovieData: Array<QueryDeepPartialEntity<Movie>> = [
      {
        title: 'Test Movie 1',
        description: 'Test Movie 1 description',
        producer: 'Test Movie 1 producer',
        director: 'Test Movie 1 director',
        banner: 'Test Movie 1 banner url'
      },
      {
        title: 'Test Movie 2',
        description: 'Test Movie 2 description',
        producer: 'Test Movie 2 producer',
        director: 'Test Movie 2 director',
        banner: 'Test Movie 2 banner url'
      },
      {
        title: 'Test Movie 3',
        description: 'Test Movie 3 description',
        producer: 'Test Movie 3 producer',
        director: 'Test Movie 3 director',
        banner: 'Test Movie 3 banner url'
      }
    ]
    movieRepository.clear()
      .then(() => {
        movieRepository.insert(testMovieData)
          .then(insertedMovieResult => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [{ id: id1 }, { id: id2 }, { id: id3 }] = insertedMovieResult.identifiers
            expect(id1).toBeDefined()
            expect(typeof id1).toEqual('number')
            expect(id1).not.toBeNaN()
            expect(id2).toBeDefined()
            expect(typeof id2).toEqual('number')
            expect(id2).not.toBeNaN()
            expect(id3).toBeDefined()
            expect(typeof id3).toEqual('number')
            expect(id3).not.toBeNaN()
            const ids = [id1, id2, id3]
            const retrievedIds: number[] = []
            movieDomainInstance.listMovies(1, 2)
              .then(resultFromListMovies => {
                const [moviesFromListMovies, moviesTotalQttFromListMovies] = resultFromListMovies
                expect(moviesFromListMovies).toHaveLength(2)
                expect(moviesTotalQttFromListMovies).toEqual(3)
                for (const movieFromListMovies of moviesFromListMovies) {
                  expect(movieFromListMovies?.id).toBeDefined()
                  if (movieFromListMovies.id !== undefined && !retrievedIds.some(retrievedId => retrievedId === movieFromListMovies.id)) {
                    retrievedIds.push(movieFromListMovies.id)
                  }
                  expect(movieFromListMovies?.title).toBeDefined()
                  expect(movieFromListMovies?.description).toBeDefined()
                  expect(movieFromListMovies?.producer).toBeDefined()
                  expect(movieFromListMovies?.director).toBeDefined()
                  expect(movieFromListMovies?.banner).toBeDefined()
                  expect(ids.some(id => id === movieFromListMovies.id)).toBeTruthy()
                  const testMovieDataIndex = ids.findIndex(id => id === movieFromListMovies.id)
                  expect(movieFromListMovies?.title).toEqual(testMovieData[testMovieDataIndex].title)
                  expect(movieFromListMovies?.description).toEqual(testMovieData[testMovieDataIndex].description)
                  expect(movieFromListMovies?.producer).toEqual(testMovieData[testMovieDataIndex].producer)
                  expect(movieFromListMovies?.director).toEqual(testMovieData[testMovieDataIndex].director)
                  expect(movieFromListMovies?.banner).toEqual(testMovieData[testMovieDataIndex].banner)
                }
                movieDomainInstance.listMovies(2, 2)
                  .then(resultFromListMovies2 => {
                    const [moviesFromListMovies2, moviesTotalQttFromListMovies2] = resultFromListMovies2
                    expect(moviesFromListMovies2).toHaveLength(1)
                    expect(moviesTotalQttFromListMovies2).toEqual(3)
                    for (const movieFromListMovies of moviesFromListMovies2) {
                      expect(movieFromListMovies?.id).toBeDefined()
                      if (movieFromListMovies.id !== undefined && !retrievedIds.some(retrievedId => retrievedId === movieFromListMovies.id)) {
                        retrievedIds.push(movieFromListMovies.id)
                      }
                      expect(movieFromListMovies?.title).toBeDefined()
                      expect(movieFromListMovies?.description).toBeDefined()
                      expect(movieFromListMovies?.producer).toBeDefined()
                      expect(movieFromListMovies?.director).toBeDefined()
                      expect(movieFromListMovies?.banner).toBeDefined()
                      expect(ids.some(id => id === movieFromListMovies.id)).toBeTruthy()
                      const testMovieDataIndex = ids.findIndex(id => id === movieFromListMovies.id)
                      expect(movieFromListMovies?.title).toEqual(testMovieData[testMovieDataIndex].title)
                      expect(movieFromListMovies?.description).toEqual(testMovieData[testMovieDataIndex].description)
                      expect(movieFromListMovies?.producer).toEqual(testMovieData[testMovieDataIndex].producer)
                      expect(movieFromListMovies?.director).toEqual(testMovieData[testMovieDataIndex].director)
                      expect(movieFromListMovies?.banner).toEqual(testMovieData[testMovieDataIndex].banner)
                    }
                    expect(retrievedIds).toHaveLength(3)
                    expect(retrievedIds).toEqual(ids)
                    done()
                  })
                  .catch((err: unknown) => {
                    done(err)
                  })
              })
              .catch((err: unknown) => {
                done(err)
              })
          })
          .catch((err: unknown) => {
            done(err)
          })
      })
      .catch((err: unknown) => {
        done(err)
      })
  })
  it('Should sync expected list of movies into database', done => {
    const movieRepository = datasourceInstance.getRepository(Movie)
    const testMovieData: RawMovie[] = [
      {
        title: 'Test Movie 1',
        description: 'Test Movie 1 description',
        producer: 'Test Movie 1 producer',
        director: 'Test Movie 1 director',
        banner: 'Test Movie 1 banner url'
      },
      {
        title: 'Test Movie 2',
        description: 'Test Movie 2 description',
        producer: 'Test Movie 2 producer',
        director: 'Test Movie 2 director',
        banner: 'Test Movie 2 banner url'
      },
      {
        title: 'Test Movie 3',
        description: 'Test Movie 3 description',
        producer: 'Test Movie 3 producer',
        director: 'Test Movie 3 director',
        banner: 'Test Movie 3 banner url'
      }
    ]
    movieRepository.clear()
      .then(() => {
        movieDomainInstance.syncMovies(testMovieData)
          .then(resultFromListMovies => {
            expect(resultFromListMovies).toBeDefined()
            expect(resultFromListMovies?.movies_added).toBeDefined()
            expect(resultFromListMovies.movies_added).toEqual(3)
            movieRepository.find()
              .then(moviesFromDatabase => {
                for (const movieFromDatabase of moviesFromDatabase) {
                  expect(movieFromDatabase.id).toBeDefined()
                  expect(movieFromDatabase?.title).toBeDefined()
                  expect(movieFromDatabase?.description).toBeDefined()
                  expect(movieFromDatabase?.producer).toBeDefined()
                  expect(movieFromDatabase?.director).toBeDefined()
                  expect(movieFromDatabase?.banner).toBeDefined()
                  expect(testMovieData.some(testMovieDataItem =>
                    testMovieDataItem.title === movieFromDatabase.title &&
                    testMovieDataItem.description === movieFromDatabase.description &&
                    testMovieDataItem.producer === movieFromDatabase.producer &&
                    testMovieDataItem.director === movieFromDatabase.director &&
                    testMovieDataItem.banner === movieFromDatabase.banner
                  )).toBeTruthy()
                }
                done()
              })
              .catch((err: unknown) => {
                done(err)
              })
          })
          .catch((err: unknown) => {
            done(err)
          })
      })
      .catch((err: unknown) => {
        done(err)
      })
  })
})
