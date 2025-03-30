import { apiClient } from "./apiClient";

export const getReservations = (page = 0, size = 10) =>
  apiClient.get(`/reservations?page=${page}&size=${size}`);

export const searchReservations = (query, page = 0, size = 10) =>
  apiClient.get(
    `/reservations/search?email=${query}&page=${page}&size=${size}`,
  );

export const getReservationsInfo = (id, page = 0, size = 10) =>
  apiClient.get(`/reservations/users/${id}/info?page=${page}&size=${size}`);

export const getReservationsInfoForMovie = (query, id, page = 0, size = 10) =>
  apiClient.get(
    `/reservations/users/${id}/info/search?title=${query}&page=${page}&size=${size}`,
  );

export const createReservation = (reservation) =>
  apiClient.post(`/reservations`, reservation);

export const createReservationsForUser = (id, makeReservationDto) =>
  apiClient.post(`/reservations/users/${id}`, makeReservationDto);

export const getReservation = (id) => apiClient.get(`/reservations/${id}`);

export const editReservation = (id, updateReservation) =>
  apiClient.patch(`/reservations/${id}`, updateReservation);

export const deleteReservation = (id) =>
  apiClient.delete(`/reservations/${id}`);
