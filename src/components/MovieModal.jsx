import { useEffect, useState, useCallback } from "react";
import { getMovieDetails, getMovieVideos, getSimilarMovies, getPosterUrl, getBackdropUrl } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import { useToast } from "../contexts/ToastContext";
import StarRating from "./StarRating";
import MovieCard from "./MovieCard";

function MovieModal({ movie, onClose, onSelectMovie }) {
  const [details, setDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isFavt, addFavt, rmvFavt, getRating, rateMovie } = useMovieContext();
  const { addToast } = useToast();

  const favourite = isFavt(movie.id);
  const userRating = getRating(movie.id);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [det, trailer, sim] = await Promise.all([
          getMovieDetails(movie.id),
          getMovieVideos(movie.id),
          getSimilarMovies(movie.id),
        ]);
        setDetails(det);
        setTrailerUrl(trailer);
        setSimilar(sim);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [movie.id]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleFavt = () => {
    if (favourite) {
      rmvFavt(movie.id);
      addToast("Removed from Favourites", "info");
    } else {
      addFavt(details || movie);
      addToast("Added to Favourites ❤️", "success");
    }
  };

  const handleRate = (stars) => {
    rateMovie(movie.id, stars);
    addToast(`Rated ${stars} ⭐`, "success");
  };

  const backdrop = details?.backdrop_path
    ? getBackdropUrl(details.backdrop_path)
    : null;

  const cast = details?.credits?.cast?.slice(0, 6) || [];
  const genres = details?.genres || [];
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#181818] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Backdrop */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden rounded-t-2xl">
          {backdrop ? (
            <>
              <img src={backdrop} alt="backdrop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-[#2a2a2a]" />
          )}

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-300">
              {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {runtime && <span>· {runtime}</span>}
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1">
                  · ⭐ <span className="text-yellow-400 font-semibold">{movie.vote_average.toFixed(1)}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="p-5 space-y-6">
            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleFavt}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all
                  ${favourite
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
              >
                {favourite ? "❤️ Favourited" : "🤍 Add to Favourites"}
              </button>

              {trailerUrl && (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>

            {/* User Rating */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Your Rating</p>
              <div className="flex items-center gap-3">
                <StarRating
                  movieId={movie.id}
                  size="lg"
                  onRate={handleRate}
                />
                {userRating > 0 && (
                  <span className="text-yellow-400 font-bold text-lg">{userRating}/5</span>
                )}
              </div>
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <span key={g.id} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/10">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {details?.overview && (
              <div>
                <h3 className="text-white font-semibold mb-2">Overview</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{details.overview}</p>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Cast</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {cast.map((actor) => (
                    <div key={actor.id} className="flex-shrink-0 text-center w-20">
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-1 bg-[#2a2a2a]">
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            👤
                          </div>
                        )}
                      </div>
                      <p className="text-white text-xs font-medium leading-tight">{actor.name}</p>
                      <p className="text-gray-500 text-xs truncate">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Movies */}
            {similar.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">You Might Also Like</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {similar.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => onSelectMovie(m)}
                      className="rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition-all text-left"
                    >
                      <div className="aspect-[2/3] bg-[#2a2a2a]">
                        {m.poster_path ? (
                          <img
                            src={getPosterUrl(m.poster_path, "w185")}
                            alt={m.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🎬</div>
                        )}
                      </div>
                      <p className="text-white text-xs p-1 leading-tight truncate">{m.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
