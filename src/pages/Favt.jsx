import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Favt() {
  const { favt } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favt.length === 0) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4">
        <div className="text-7xl mb-6">❤️</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Favourites Yet</h2>
        <p className="text-gray-500 text-center max-w-xs">
          Browse movies on the Home page and tap the heart icon to save them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-black text-white">
            My <span className="text-red-500">Favourites</span>
          </h1>
          <span className="px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 text-sm font-semibold">
            {favt.length}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favt.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={setSelectedMovie}
            />
          ))}
        </div>
      </div>

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

export default Favt;