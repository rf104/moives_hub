import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favt, setFavt] = useState([]);
  const [ratings, setRatings] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const storedFavt = localStorage.getItem("mh_favt");
    const storedRatings = localStorage.getItem("mh_ratings");
    if (storedFavt) setFavt(JSON.parse(storedFavt));
    if (storedRatings) setRatings(JSON.parse(storedRatings));
  }, []);

  // Persist favourites
  useEffect(() => {
    localStorage.setItem("mh_favt", JSON.stringify(favt));
  }, [favt]);

  // Persist ratings
  useEffect(() => {
    localStorage.setItem("mh_ratings", JSON.stringify(ratings));
  }, [ratings]);

  // Save full movie object (bug fix — old code saved only id)
  const addFavt = (movie) => {
    setFavt((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const rmvFavt = (movieId) => {
    setFavt((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavt = (movieId) => favt.some((m) => m.id === movieId);

  const rateMovie = (movieId, stars) => {
    setRatings((prev) => ({ ...prev, [movieId]: stars }));
  };

  const getRating = (movieId) => ratings[movieId] || 0;

  const value = {
    favt,
    addFavt,
    rmvFavt,
    isFavt,
    ratings,
    rateMovie,
    getRating,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};