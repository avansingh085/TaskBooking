import { apiClient } from './apiClient';

export const getAllRooms = () => {
  return apiClient.get('/room');
};

export const createRoom=(newRoom)=>{
  return apiClient.post("/room",newRoom);
}