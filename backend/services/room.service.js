const Room = require("../models/room.model");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../utils/ApiError");

class RoomService {

  static async createRoom({ name, price_per_night }) {

    if (!name || !price_per_night) {
      throw new ApiError(httpStatus.BAD_REQUEST, "All fields required");
    }

    if (price_per_night <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Price must be greater than 0");
    }

    const roomId = await Room.create({
      name,
      price_per_night
    });

    return roomId;
  }


  static async getAllRooms() {

    return await Room.findAll();

  }


  static async getRoomById(id) {

    const room = await Room.findById(id);

    if (!room) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found");
    }

    return room;
  }


  static async updateRoom(id, { name, price_per_night }) {

    const room = await Room.findById(id);

    if (!room) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found");
    }

    if (price_per_night && price_per_night <= 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Price must be greater than 0");
    }

    await Room.update(id, { name, price_per_night });

  }


  static async deleteRoom(id) {

    const room = await Room.findById(id);

    if (!room) {
      throw new ApiError(httpStatus.NOT_FOUND, "Room not found");
    }

    await Room.delete(id);

  }

}

module.exports = RoomService;