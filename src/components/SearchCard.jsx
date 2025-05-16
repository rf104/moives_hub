import React from 'react'

function SearchCard() {
  return (
    <div className='flex flex-row gap-2 rounded-xl items-center justify-center mb-2'>
        <div className='border-b-cyan-900 '>
            <input type="text"  className='border-zinc-800 rounded border w-sm h-8'/>
        </div>
        <div>
            <button className='border bg-green-500 px-1 rounded-sm hover:bg-red-500'>Search</button>
        </div>
    </div>
  )
}

export default SearchCard