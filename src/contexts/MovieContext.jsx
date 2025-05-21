import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) =>{

    const [favt, setFavt] = useState([]);

    useEffect(()=>{
        const storageFav = localStorage.getItem('favt')
        if(storageFav) setFavt(JSON.parse(storageFav));
    },[])

    useEffect(()=>{
        localStorage.setItem('favt',JSON.stringify(favt))
    },[favt])


    const addFavt = (movie)=>{
        setFavt(prev => [...prev,movie])
    }

    const rmvFavt = (movieId)=>{
        setFavt(prev => prev.filter(movie=>movie.id !==movieId))
    }

    const isFavt = (movieId)=>{
        return favt.some(movie => movie.id === movieId)
    }


    const value = {
        favt,
        addFavt,
        rmvFavt,
        isFavt,
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}