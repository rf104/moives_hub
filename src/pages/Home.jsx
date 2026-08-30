import { useState, useEffect, useCallback, useRef } from "react";
import MovieCard from "../components/MovieCard";
import SearchSuggestions from "../components/SearchSuggestions";
import LoadingSkeleton from "../components/LoadingSkeleton";
import MovieModal from "../components/MovieModal";
import { getPopularMovies, searchMovies, getTrendingMovies } from "../services/api";
import { useToast } from "../contexts/ToastContext";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionTitle, setSectionTitle] = useState("🔥 Popular Right Now");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { addToast } = useToast();
  const debounceRef = useRef(null);
  const searchInputRef = useRef(null);

  // Load popular movies on mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const popular = await getPopularMovies();
        setMovies(popular);
        setSectionTitle("🔥 Popular Right Now");
      } catch {
        setError("Failed to load movies. Check your connection.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Debounced live suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchMovies(query);
        setSuggestions(results.slice(0, 6));
        setShowSuggestions(true);
      } catch {
        /* silent */
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    setLoading(true);
    setError(null);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setSectionTitle(`🔍 Results for "${query}"`);
    } catch {
      setError("Search failed. Please try again.");
      addToast("Search failed", "error");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  const handleSuggestionSelect = useCallback((movie) => {
    setShowSuggestions(false);
    setQuery("");
    setSelectedMovie(movie);
  }, []);

  const handleShowPopular = async () => {
    setLoading(true);
    setError(null);
    setQuery("");
    try {
      const popular = await getPopularMovies();
      setMovies(popular);
      setSectionTitle("🔥 Popular Right Now");
    } catch {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414]">

      {/* Hero search banner */}
      <div className="relative py-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]
            bg-red-700/10 rounded-full blur-3xl" />
        </div>

        <h1 className="relative text-3xl sm:text-4xl font-black text-white mb-2">
          Discover <span className="text-red-500">Movies</span> You'll Love
        </h1>
        <p className="relative text-gray-500 text-sm mb-8">
          Search, rate, and save your favourites
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder="Search movies..."
                className="w-full px-5 py-3.5 rounded-xl bg-[#1c1c1c] border border-white/10
                  text-white placeholder-gray-500 text-sm
                  focus:outline-none focus:border-red-500 transition-colors"
              />
              <SearchSuggestions
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                visible={showSuggestions}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white
                font-semibold text-sm transition-all hover:shadow-lg hover:shadow-red-700/30"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">{sectionTitle}</h2>
          {sectionTitle !== "🔥 Popular Right Now" && (
            <button
              onClick={handleShowPopular}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              ← Back to Popular
            </button>
          )}
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSkeleton count={10} />
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-gray-500">No movies found. Try a different search!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSelectMovie={(m) => setSelectedMovie(m)}
        />
      )}
    </div>
  );
}

export default Home;