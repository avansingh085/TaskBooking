const Booking = require("../models/booking.model");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../utils/ApiError");

class BookingService {

  static async createBooking(user_id, { room_id, start_date, end_date }) {

    if (!room_id || !start_date || !end_date) {
      throw new ApiError(httpStatus.BAD_REQUEST, "All fields required");
    }

    const isAvailable = await Booking.isRoomAvailable(room_id, start_date, end_date);

    if (!isAvailable) {
      throw new ApiError(httpStatus.CONFLICT, "Room not available for selected dates");
    }

    const bookingId = await Booking.create({
      user_id,
      room_id,
      start_date,
      end_date
    });

    return bookingId;
  }


  static async isRoomAvailable(room_id, start_date, end_date) {

    if (!room_id || !start_date || !end_date) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Room id and dates required");
    }

    return await Booking.isRoomAvailable(room_id, start_date, end_date);
  }


  static async getUserBookings(userId) {

    return await Booking.findByUserId(userId);

  }


  static async getBookingById(id) {

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
    }

    return booking;
  }


  static async updateBooking(id, data) {

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
    }

    await Booking.update(id, data);
  }


  static async deleteBooking(id) {

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new ApiError(httpStatus.NOT_FOUND, "Booking not found");
    }

    await Booking.delete(id);
  }

}

module.exports = BookingService;