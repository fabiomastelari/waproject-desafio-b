import { Movie } from '../otp/movie'
import MovieListItem from './MovieListItem'

export interface MovieListProps {
  movies: Movie[],
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="divide-y divide-slate-100">
      {movies.map((movie) => (
        <MovieListItem key={movie.id} movie={movie} />
      ))}
    </ul>
  )
}