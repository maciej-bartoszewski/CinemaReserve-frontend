import { apiClient } from "./apiClient";

export const getAllGenres = () => apiClient.get(`/genres/all`);

export const getGenres = (page = 0, size = 10) =>
  apiClient.get(`/genres?page=${page}&size=${size}`);

export const searchGenres = (query, page = 0, size = 10) =>
  apiClient.get(`/genres/search?query=${query}&page=${page}&size=${size}`);

export const createGenre = (genre) => apiClient.post(`/genres`, genre);

export const getGenre = (id) => apiClient.get(`/genres/${id}`);

export const editGenre = (id, updateGenre) =>
  apiClient.patch(`/genres/${id}`, updateGenre);

export const deleteGenre = (id) => apiClient.delete(`/genres/${id}`);
