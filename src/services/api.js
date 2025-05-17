const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// const API_KEY = "337fda11907691442fde2113ef76d345";
// const BASE_URL=  "https://api.themoviedb.org/3";

// export const getPopularMovies = async()=>{
//     //return await (await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)).json().results;
//     const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
//     const Movie = await response.json();
//     console.log(Movie);
//     return Movie.results;
// } 


export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    
    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Response:", data); // 👈 Inspect the response
    return data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return []; // Return empty array to prevent crashes
  }
};

export const searchMovies = async(query)=>{
    //return await (await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)).json().results;

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
        if(!response.ok) console.log('Error in Search');
        const data =  await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
      console.log('aref eikane error');
    }

  }
