const BookingService = require("../services/booking.service");
const httpStatus = require("../utils/httpStatus");
const { sendSuccess, sendError } = require("../utils/sendResponse");

class BookingController {

  static createBooking = async (req, res) => {
    try {

      const user_id = req.user.id;
      const bookingId = await BookingService.createBooking(user_id, req.body);

      return sendSuccess(
        res,
        httpStatus.CREATED,
        "Booking created successfully",
        { bookingId }
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static isRoomAvailable = async (req, res) => {
    try {

      const { room_id, start_date, end_date } = req.query;
     
      const available = await BookingService.isRoomAvailable(
        room_id,
        start_date,
        end_date
      );
     

      return sendSuccess(
        res,
        httpStatus.OK,
        available ? "available" : "unavailable"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static getAllBookings = async (req, res) => {
    try {

      const userId = req.user.id;

      const bookings = await BookingService.getUserBookings(userId);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Bookings fetched successfully",
        bookings
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static getBookingById = async (req, res) => {
    try {

      const { id } = req.params;

      const booking = await BookingService.getBookingById(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Booking fetched successfully",
        booking
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static updateBooking = async (req, res) => {
    try {

      const { id } = req.params;

      await BookingService.updateBooking(id, req.body);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Booking updated successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static deleteBooking = async (req, res) => {
    try {

      const { id } = req.params;

      await BookingService.deleteBooking(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Booking deleted successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };

}

module.exports = BookingController;