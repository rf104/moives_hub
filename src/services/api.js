const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const IMG_BASE = "https://image.tmdb.org/t/p";

export const getPosterUrl = (path, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const getBackdropUrl = (path, size = "w1280") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

const apiFetch = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const getPopularMovies = async () => {
  const data = await apiFetch(`/movie/popular?api_key=${API_KEY}`);
  return data.results;
};

export const searchMovies = async (query) => {
  const data = await apiFetch(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  return data.results;
};

export const getMovieDetails = async (id) => {
  return await apiFetch(`/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
};

export const getSimilarMovies = async (id) => {
  const data = await apiFetch(`/movie/${id}/similar?api_key=${API_KEY}`);
  return data.results.slice(0, 12);
};

export const getMovieVideos = async (id) => {
  const data = await apiFetch(`/movie/${id}/videos?api_key=${API_KEY}`);
  const trailer = data.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

export const getTrendingMovies = async () => {
  const data = await apiFetch(`/trending/movie/week?api_key=${API_KEY}`);
  return data.results;
};
