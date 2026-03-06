const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = require("../config/server.config");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../utils/ApiError");

class AuthService {

  static async register({ name, email, password }) {

    if (!name || !email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "All fields required");
    }

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return userId;
  }


  static async login({ email, password }) {

    if (!email || !password) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email and password required");
    }

    const user = await User.findByEmail(email);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { token };
  }
}

module.exports = AuthService;