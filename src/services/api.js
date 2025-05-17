const API_KEY = "337fda11907691442fde2113ef76d345";
const BASE_URL=  'https://api.themoviedb.org/3'

export const getPopularMovies = async()=>{
    return (await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)).json().results;
} 

export const searchMovies = async(query)=>{
    return (await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)).json().results;
}
