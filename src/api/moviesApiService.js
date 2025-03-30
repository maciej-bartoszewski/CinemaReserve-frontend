import { apiClient } from "./apiClient";

export const getMovies = (page = 0, size = 10) =>
  apiClient.get(`/movies?page=${page}&size=${size}`);

export const getMoviesSchedule = () => apiClient.get(`/movies/schedules`);

export const getMovieInfo = (id) => apiClient.get(`/movies/${id}/info`);

export const searchMovies = (query, page = 0, size = 10) =>
  apiClient.get(`/movies/search?title=${query}&page=${page}&size=${size}`);

export const createMovie = (movie) => apiClient.post(`/movies`, movie);

export const getMovie = (id) => apiClient.get(`/movies/${id}`);

export const editMovie = (id, updateMovie) =>
  apiClient.patch(`/movies/${id}`, updateMovie);

export const deleteMovie = (id) => apiClient.delete(`/movies/${id}`);
