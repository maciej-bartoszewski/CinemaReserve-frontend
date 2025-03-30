import { apiClient } from "./apiClient";

export const logToApp = (user) => apiClient.post(`/auth/login`, user);

export const registerToApp = (user) => apiClient.post(`/auth/register`, user);
