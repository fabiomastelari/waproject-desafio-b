import { ReactElement } from 'react'
import { Movie } from '../otp/movie'
import Image from 'next/image'

export interface MovieListProps {
  movie: Movie
}
export default function MovieListItem({ movie }: MovieListProps): ReactElement {
  return (
    <article className="flex sm:flex-wrap items-start space-x-6 p-6 bg-slate-100 m-2 rounded-lg">
      <div className='min-w-max flex-none'>
        <Image src={ movie.banner } alt="" width="358" height="176" layout="fixed" objectFit="cover" className="flex-none rounded-md bg-slate-100" />
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{movie.title}</h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="flex-none w-full mt-2 font-normal">
            <dt className="sr-only">Description</dt>
            <dd className="text-slate-400">{movie.description}</dd>
          </div>
          <div className="flex-none min-w-max mt-2 mr-4">
            <dt>Directed by</dt>
            <dd className='font-normal'>{movie.director}</dd>
          </div>
          <div className="flex-none min-w-max mt-2">
            <dt>Producted by</dt>
            <dd className='font-normal'>{movie.producer}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
