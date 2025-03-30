import { apiClient } from "./apiClient";

export const getTickets = (page = 0, size = 10) =>
  apiClient.get(`/tickets?page=${page}&size=${size}`);

export const searchTickets = (query, page = 0, size = 10) =>
  apiClient.get(`/tickets/search?query=${query}&page=${page}&size=${size}`);

export const createTicket = (ticket) => apiClient.post(`/tickets`, ticket);

export const getTicket = (id) => apiClient.get(`/tickets/${id}`);

export const editTicket = (id, updateTicket) =>
  apiClient.patch(`/tickets/${id}`, updateTicket);

export const deleteTicket = (id) => apiClient.delete(`/tickets/${id}`);
