import React, { use, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import SearchCard from '../components/SearchCard'
import NavBar from '../components/NavBar'
import { useState } from 'react'
import { getPopularMovies,searchMovies } from '../services/api'

function Home() {

    const [Search,setSerch] = useState('');
    const [storage,setStorage] = useState([]);
    const [error,setError] = useState(null)
    const [loading, setLoadin] = useState(true)
    const handleSearch = async (e) =>{
        e.preventDefault();
        if(!Search.trim()) return;
        
        
        try {
            setLoadin(true);
            const searchResult = await searchMovies(Search);
            setStorage(searchResult || []);
            setError(null);
        } catch (error) {
            console.log('Search a error!!')
            setError('Error in Search');
            setStorage([])
        }finally{
            setLoadin(false);
        }

        setSerch('');
    }

    useEffect(()=>{
        const loadPopularMovies = async () =>{
            try {
                const popularMovies = await getPopularMovies();
                setStorage(popularMovies)
            } catch (error) {
                console.log('Error is showing in loadPopularMovies');
                setError('Faild to load movies');
            }
            finally{
                setLoadin(false);
            }
        }
        loadPopularMovies();
    },[])

    // const storage = [
    //     {
    //         id : 1,
    //         title:'Forest Gump',
    //         release_date : '2024',
    //         img : "https://images.pexels.com/photos/9807584/pexels-photo-9807584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id : 2,
    //         title:'Chernobyl',
    //         release_date:'2024',
    //         img:"https://images.pexels.com/photos/29097935/pexels-photo-29097935/free-photo-of-apocalyptic-scene-with-gas-mask-in-armenia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    //     },
    //     {
    //         id : 3,
    //         title:'Sex Education',
    //         release_date:'2025', 
    //         img:"https://images.pexels.com/photos/3979153/pexels-photo-3979153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    //     }
    // ]
  
  
    return (
    <>  
        <div className='flex gap-2 justify-center items-center my-2'>
            <input type="text" name="" id="" 
            value={Search}
            onChange={(e)=>setSerch(e.target.value)}
            placeholder='Search Your Movie'
            className='border-zinc-800 rounded border w-sm h-8 bg-amber-50 p-2'/>
            <div className=''>
            <button onClick={handleSearch} className='border bg-green-500 px-1 rounded-sm hover:bg-red-500'>Search</button>
            </div>
        </div>
        <div>
            {
                storage.map((movie)=>(
                    <MovieCard movie={movie} key={movie.id}/>
                ))
            }
        </div>
    </>
  )
}

export default Home