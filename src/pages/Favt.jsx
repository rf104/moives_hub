import React from 'react'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'
function Favt() {

  const {favt} = useMovieContext();

  if(favt){
    return <>
           <h2 className='text-3xl text-blue-50 mt-2'>Your Favt Movies!! </h2>
           <div>
            {
                favt.map((movie)=>(
                    <MovieCard movie={movie} key={movie.id}/>
                ))
            }
          </div>
          </>
  }

  return (
    <>
        <div className='w-auto h-auto text-3xl font-bold text-amber-100 '>
            <h2 className='text-orange-50'>No favt movie select yet!!</h2>
            <p>Add favt movies to show up here!!</p>
        </div>
    </>
  )
}

export default Favt