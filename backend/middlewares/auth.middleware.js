const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");

const JWT_SECRET = "your_secret_key";

const authMiddleware = (req, res, next) => {

  const token = req.cookies?.token;

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;