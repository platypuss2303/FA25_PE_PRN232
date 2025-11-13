import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowUpDown,
  Loader2,
  AlertCircle,
  Inbox,
  PlusCircle,
} from "lucide-react";
import { movieService } from "../services/api";
import MovieCard from "../components/MovieCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

export default function ListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  // Extract unique genres from movies
  const genres = [...new Set(movies.map((m) => m.genre).filter(Boolean))];

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedGenre) params.genre = selectedGenre;
      if (sortBy) params.sort = sortBy;

      const response = await movieService.getAll(params);
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, selectedGenre, sortBy]);

  const handleDelete = async () => {
    try {
      await movieService.delete(deleteId);
      setDeleteId(null);
      setToast({ message: "Movie deleted successfully!", type: "success" });
      fetchMovies();
    } catch (err) {
      setError(err.message);
      setToast({ message: "Failed to delete movie", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-danger-50 to-danger-100 border-l-4 border-danger-500 text-danger-800 px-6 py-4 rounded-xl shadow-soft">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-danger-600" size={24} />
          <div>
            <h3 className="font-bold">Oops! Something went wrong</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Movie Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Browse, search, and manage your movies
          </p>
        </div>
        <Link
          to="/create"
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold px-6 py-3 rounded-xl shadow-modern hover:shadow-modern-hover transition-all duration-300 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add Movie
        </Link>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className="bg-white rounded-2xl shadow-soft p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search by Title */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Search className="inline w-4 h-4 mr-1" />
              Search by Title
            </label>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
            />
          </div>

          {/* Filter by Genre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Filter by Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <ArrowUpDown className="inline w-4 h-4 mr-1" />
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
            >
              <option value="">Latest First</option>
              <option value="title_asc">Title (A-Z)</option>
              <option value="title_desc">Title (Z-A)</option>
              <option value="rating_desc">Rating (High to Low)</option>
              <option value="rating_asc">Rating (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedGenre || sortBy) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {searchTerm && (
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedGenre && (
              <span className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                Genre: {selectedGenre}
              </span>
            )}
            {sortBy && (
              <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                Sort: {sortBy.replace("_", " ")}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("");
                setSortBy("");
              }}
              className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-full text-sm font-medium underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Movie Grid */}
      {movies.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <Inbox className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Movies Found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedGenre
              ? "Try adjusting your search or filters"
              : "Start building your collection by adding your first movie!"}
          </p>
          {!searchTerm && !selectedGenre && (
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-modern transition-all duration-300"
            >
              <PlusCircle size={20} />
              Add Your First Movie
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={() => setDeleteId(movie.id)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <ConfirmModal
          title="Delete Movie"
          message="Are you sure you want to delete this movie? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
