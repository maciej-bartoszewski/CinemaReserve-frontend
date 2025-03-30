import { apiClient } from "./apiClient";

export const getHalls = (page = 0, size = 20) =>
  apiClient.get(`/halls?page=${page}&size=${size}`);

export const searchHalls = (query, page = 0, size = 20) =>
  apiClient.get(`/halls/search?query=${query}&page=${page}&size=${size}`);

export const createHall = (hall) => apiClient.post(`/halls`, hall);

export const getHall = (id) => apiClient.get(`/halls/${id}`);

export const editHall = (id, updateHall) =>
  apiClient.patch(`/halls/${id}`, updateHall);

export const deleteHall = (id) => apiClient.delete(`/halls/${id}`);
