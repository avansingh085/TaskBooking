const RoomService = require("../services/room.service");
const httpStatus = require("../utils/httpStatus");
const { sendSuccess, sendError } = require("../utils/sendResponse");

class RoomController {

  static createRoom = async (req, res) => {
    try {

      const roomId = await RoomService.createRoom(req.body);

      return sendSuccess(
        res,
        httpStatus.CREATED,
        "Room created successfully",
        { roomId }
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static getAllRooms = async (req, res) => {
    try {

      const rooms = await RoomService.getAllRooms();

      return sendSuccess(
        res,
        httpStatus.OK,
        "Rooms fetched successfully",
        rooms
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static getRoomById = async (req, res) => {
    try {

      const { id } = req.params;

      const room = await RoomService.getRoomById(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Room fetched successfully",
        room
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static updateRoom = async (req, res) => {
    try {

      const { id } = req.params;

      await RoomService.updateRoom(id, req.body);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Room updated successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static deleteRoom = async (req, res) => {
    try {

      const { id } = req.params;

      await RoomService.deleteRoom(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "Room deleted successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };

}

module.exports = RoomController;