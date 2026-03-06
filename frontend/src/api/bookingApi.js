import { apiClient } from './apiClient';

export const checkRoomAvailability = (roomId, startDate, endDate) => {
  console.log("API call to check availability for room:", roomId, "from", startDate, "to", endDate);
  return apiClient.get('/booking/check', {
    params: { room_id:roomId, start_date: startDate, end_date: endDate } 
  });
};

export const getUserBookings=()=>{
  return apiClient.get("/booking");
}

export const createBooking = (bookingData) => {
  return apiClient.post('/booking', bookingData);
};