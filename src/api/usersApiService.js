import { apiClient } from "./apiClient";

export const getUsers = (page = 0, size = 10) =>
  apiClient.get(`/users?page=${page}&size=${size}`);

export const searchUsers = (query, page = 0, size = 10) =>
  apiClient.get(`/users/search?query=${query}&page=${page}&size=${size}`);

export const getUser = (id) => apiClient.get(`/users/${id}`);

export const editUser = (id, updateUser) =>
  apiClient.patch(`/users/${id}`, updateUser);

export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
