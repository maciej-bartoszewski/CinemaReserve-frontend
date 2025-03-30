import { apiClient } from "./apiClient";

export const getScreenings = (page = 0, size = 10) =>
  apiClient.get(`/screenings?page=${page}&size=${size}`);

export const getScreeningData = (id) =>
  apiClient.get(`/screenings/${id}/reservations`);

export const searchScreenings = (query, page = 0, size = 10) =>
  apiClient.get(`/screenings/search?title=${query}&page=${page}&size=${size}`);

export const createScreening = (screening) =>
  apiClient.post(`/screenings`, screening);

export const getScreening = (id) => apiClient.get(`/screenings/${id}`);

export const editScreening = (id, updateScreening) =>
  apiClient.patch(`/screenings/${id}`, updateScreening);

export const deleteScreening = (id) => apiClient.delete(`/screenings/${id}`);
