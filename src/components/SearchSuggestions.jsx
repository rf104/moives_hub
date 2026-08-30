import { getPosterUrl } from "../services/api";

function SearchSuggestions({ suggestions, onSelect, visible }) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-80 overflow-y-auto">
      {suggestions.map((movie) => (
        <button
          key={movie.id}
          type="button"
          onMouseDown={(e) => e.preventDefault()} // prevent blur before click
          onClick={() => onSelect(movie)}
          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
        >
          <div className="w-9 h-12 rounded overflow-hidden flex-shrink-0 bg-[#2a2a2a]">
            {movie.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path, "w92")}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                🎬
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{movie.title}</p>
            <p className="text-gray-400 text-xs">
              {movie.release_date ? movie.release_date.slice(0, 4) : ""}
              {movie.vote_average ? ` · ⭐ ${movie.vote_average.toFixed(1)}` : ""}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

export default SearchSuggestions;
