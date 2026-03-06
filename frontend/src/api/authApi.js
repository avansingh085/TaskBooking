import { apiClient } from './apiClient';

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login',credentials);
};

export const registerUser = (userData) => {
 
  return apiClient.post('/auth/register',userData);
};

export const logoutUser = () => {
  return apiClient.post('/auth/logout',{});
};