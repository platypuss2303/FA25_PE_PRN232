import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function MovieForm({
  initialData = {},
  onSubmit,
  loading,
  isEdit = false,
  validationErrors = {},
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    genre: initialData.genre || "",
    rating: initialData.rating || "",
    posterImageUrl: initialData.posterImageUrl || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData.posterImageUrl || null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update image preview when URL changes
    if (name === "posterImageUrl" && value && !imageFile) {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        e.target.value = null;
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPEG, PNG, GIF, and WebP images are allowed");
        e.target.value = null;
        return;
      }

      setImageFile(file);
      setFormData((prev) => ({ ...prev, posterImageUrl: "" })); // Clear URL when file selected

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update preview when posterImageUrl changes
  useEffect(() => {
    if (formData.posterImageUrl && !imageFile) {
      setImagePreview(formData.posterImageUrl);
    }
  }, [formData.posterImageUrl, imageFile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("Title", formData.title);
    if (formData.genre) submitData.append("Genre", formData.genre);
    if (formData.rating) submitData.append("Rating", formData.rating);

    if (imageFile) {
      submitData.append("PosterImageFile", imageFile);
    } else if (formData.posterImageUrl) {
      submitData.append("PosterImageUrl", formData.posterImageUrl);
    }

    onSubmit(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-lg shadow-soft rounded-3xl p-8 border border-gray-100"
    >
      {/* Title Field */}
      <div className="mb-6">
        <label
          className="block text-gray-800 text-sm font-bold mb-2 flex items-center gap-2"
          htmlFor="title"
        >
          <span className="text-lg">🎬</span>
          Movie Title
          <span className="text-danger-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={200}
          placeholder="Enter movie title..."
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
            validationErrors.Title
              ? "border-danger-500 bg-danger-50"
              : "border-gray-200 bg-white"
          }`}
        />
        {validationErrors.Title && (
          <div className="mt-2 flex items-center gap-2 text-danger-600 text-sm">
            <span>⚠️</span>
            <p>{validationErrors.Title[0]}</p>
          </div>
        )}
      </div>

      {/* Genre Field */}
      <div className="mb-6">
        <label
          className="block text-gray-800 text-sm font-bold mb-2 flex items-center gap-2"
          htmlFor="genre"
        >
          <span className="text-lg">🎭</span>
          Genre
          <span className="text-xs font-normal text-gray-500">(Optional)</span>
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
            validationErrors.Genre
              ? "border-danger-500 bg-danger-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <option value="">Select a genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Adventure">Adventure</option>
          <option value="Crime">Crime</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Animation">Animation</option>
          <option value="Documentary">Documentary</option>
        </select>
        {validationErrors.Genre && (
          <div className="mt-2 flex items-center gap-2 text-danger-600 text-sm">
            <span>⚠️</span>
            <p>{validationErrors.Genre[0]}</p>
          </div>
        )}
      </div>

      {/* Rating Field */}
      <div className="mb-6">
        <label
          className="block text-gray-800 text-sm font-bold mb-2 flex items-center gap-2"
          htmlFor="rating"
        >
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          Rating
          <span className="text-xs font-normal text-gray-500">
            (1-5, Optional)
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rate 1-5"
            className={`w-32 px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              validationErrors.Rating
                ? "border-danger-500 bg-danger-50"
                : "border-gray-200 bg-white"
            }`}
          />
          {formData.rating && (
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={
                    index < formData.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
          )}
        </div>
        {validationErrors.Rating && (
          <div className="mt-2 flex items-center gap-2 text-danger-600 text-sm">
            <span>⚠️</span>
            <p>{validationErrors.Rating[0]}</p>
          </div>
        )}
      </div>

      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-gray-800 text-sm font-bold mb-4 flex items-center gap-2">
          <span className="text-lg">🖼️</span>
          Poster Image
          <span className="text-xs font-normal text-gray-500">(Optional)</span>
        </label>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4 relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-gray-200"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
                setFormData((prev) => ({ ...prev, posterImageUrl: "" }));
              }}
              className="absolute top-2 right-2 bg-danger-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-danger-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Poster
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          <p className="mt-2 text-xs text-gray-500">
            ✓ Supported formats: JPEG, PNG, GIF, WebP | Max size: 5MB
          </p>
        </div>

        {/* OR Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
          </div>
        </div>

        {/* URL Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Poster Image URL
          </label>
          <input
            type="url"
            name="posterImageUrl"
            value={formData.posterImageUrl}
            onChange={handleChange}
            disabled={imageFile !== null}
            placeholder="https://example.com/poster.jpg"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              imageFile
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "border-gray-200 bg-white"
            } ${
              validationErrors.PosterImageUrl
                ? "border-danger-500 bg-danger-50"
                : ""
            }`}
          />
          {validationErrors.PosterImageUrl && (
            <div className="mt-2 flex items-center gap-2 text-danger-600 text-sm">
              <span>⚠️</span>
              <p>{validationErrors.PosterImageUrl[0]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:from-primary-600 hover:to-primary-700 hover:scale-105 shadow-lg shadow-primary-500/30"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {isEdit ? "Updating..." : "Creating..."}
            </span>
          ) : (
            <span>{isEdit ? "✓ Update Movie" : "+ Create Movie"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
