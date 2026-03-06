const User = require("../models/user.model");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../utils/ApiError");

class UserService {

  static async getUserById(id) {

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }


  static async updateUser(id, { name, email }) {

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    if (!name && !email) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Nothing to update");
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    await User.update(id, updateData);

  }


  static async deleteUser(id) {

    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    await User.delete(id);

  }

}

module.exports = UserService;