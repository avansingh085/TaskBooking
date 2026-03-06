const AuthService = require("../services/auth.service");
const httpStatus = require("../utils/httpStatus");
const { sendSuccess, sendError } = require("../utils/sendResponse");

class AuthController {

  static register = async (req, res) => {
    try {
      const userId = await AuthService.register(req.body);

      return sendSuccess(
        res,
        httpStatus.CREATED,
        "User registered successfully",
        { userId }
      );

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static login = async (req, res) => {
    try {
      const { token } = await AuthService.login(req.body);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });

      return sendSuccess(res, httpStatus.OK, "Login successful");

    } catch (error) {
      return sendError(res, error.status || 500, error.message);
    }
  };


  static logout = async (req, res) => {
    console.log("logout controller called");
    res.clearCookie("token");
    return sendSuccess(res, httpStatus.OK, "Logout successful");
  };

}

module.exports = AuthController;