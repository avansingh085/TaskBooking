import { apiClient } from './apiClient';

export const getUser = () => {
  return apiClient.get(`/user`);
};