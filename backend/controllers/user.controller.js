const UserService = require("../services/user.service");
const httpStatus = require("../utils/httpStatus");
const { sendSuccess, sendError } = require("../utils/sendResponse");

class UserController {

  static getUser = async (req, res) => {
    try {

      const id = req.user.id;

      const user = await UserService.getUserById(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "User fetched successfully",
        user
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static getUserById = async (req, res) => {
    try {

      const { id } = req.params;

      const user = await UserService.getUserById(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "User fetched successfully",
        user
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static updateUser = async (req, res) => {
    try {

      const { id } = req.params;

      await UserService.updateUser(id, req.body);

      return sendSuccess(
        res,
        httpStatus.OK,
        "User updated successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static deleteUser = async (req, res) => {
    try {

      const { id } = req.params;

      await UserService.deleteUser(id);

      return sendSuccess(
        res,
        httpStatus.OK,
        "User deleted successfully"
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };

}

module.exports = UserController;