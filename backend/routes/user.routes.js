const express = require("express");
const UserController = require("../controllers/user.controller.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/", authMiddleware, asyncHandler(UserController.getUser));
router.get("/:id", authMiddleware, asyncHandler(UserController.getUserById));
router.put("/:id", authMiddleware, asyncHandler(UserController.updateUser));
router.delete("/:id", authMiddleware, asyncHandler(UserController.deleteUser));

module.exports = router;