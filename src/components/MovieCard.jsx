import React from 'react'

function MovieCard({movie}) {
    const favtBtn = ()=>{
        alert('favt movie added')
    }
  return (
    <div className='rounded-sm  flex-col inline-block border p-4 mx-2 bg-amber-50'>
        <div className='flex align-top justify-center'>
            {/**Image part handled here */}
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-poster" className='w-40 h-40 rounded-md' />
            <div>
                <button className='h-8 w-8' onClick={favtBtn}>🤍</button>
            </div>
        </div>
        <div>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </div>
  )
}

export default MovieCard