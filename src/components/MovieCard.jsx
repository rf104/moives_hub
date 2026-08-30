import { getPosterUrl } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import { useToast } from "../contexts/ToastContext";
import StarRating from "./StarRating";

function MovieCard({ movie, onClick }) {
  const { isFavt, addFavt, rmvFavt, getRating, rateMovie } = useMovieContext();
  const { addToast } = useToast();

  const favourite = isFavt(movie.id);
  const userRating = getRating(movie.id);
  const posterUrl = getPosterUrl(movie.poster_path);

  const handleFavt = (e) => {
    e.stopPropagation();
    if (favourite) {
      rmvFavt(movie.id);
      addToast("Removed from Favourites", "info");
    } else {
      addFavt(movie);
      addToast("Added to Favourites ❤️", "success");
    }
  };

  const handleRate = (stars) => {
    rateMovie(movie.id, stars);
    addToast(`Rated ${stars} ⭐`, "success");
  };

  return (
    <div
      onClick={() => onClick && onClick(movie)}
      className="group relative rounded-xl overflow-hidden bg-[#1c1c1c] cursor-pointer
        transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/60
        hover:ring-2 hover:ring-red-500/60"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a] text-4xl">
            🎬
          </div>
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Favourite button */}
        <button
          onClick={handleFavt}
          className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center
            rounded-full bg-black/60 backdrop-blur-sm transition-all
            hover:scale-110 hover:bg-red-600"
          aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
        >
          <span className="text-base">{favourite ? "❤️" : "🤍"}</span>
        </button>

        {/* TMDB rating badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5
            rounded-full bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <p className="text-gray-500 text-xs mb-2">
          {movie.release_date ? movie.release_date.slice(0, 4) : ""}
        </p>

        {/* User's star rating */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <StarRating movieId={movie.id} size="sm" onRate={handleRate} />
          {userRating > 0 && (
            <span className="text-yellow-400 text-xs font-bold">{userRating}/5</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;