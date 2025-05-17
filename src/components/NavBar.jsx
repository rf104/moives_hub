import React from 'react'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <div className='flex justify-between items-center gap-2 bg-amber-200'>
        <div>
            <Link to='/home'>Logo</Link>
        </div>
        <div className='flex flex-row items-center gap-2'>
            <div><Link to='/home'>Home</Link></div>
            <div><Link to='/favt'>Favourites</Link></div>
        </div>
    </div>
  )
}

export default NavBar