import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5201";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const movieService = {
  // Get all movies with optional search, filter, sort, and pagination
  getAll: (params = {}) => {
    return api.get("/movies", { params });
  },

  // Get single movie by ID
  getById: (id) => {
    return api.get(`/movies/${id}`);
  },

  // Create new movie (multipart/form-data)
  create: (formData) => {
    return api.post("/movies", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update movie (multipart/form-data)
  update: (id, formData) => {
    return api.put(`/movies/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete movie
  delete: (id) => {
    return api.delete(`/movies/${id}`);
  },
};

export default api;
