const express = require("express");
const RoomController = require("../controllers/room.controller.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(RoomController.createRoom));
router.get("/", asyncHandler(RoomController.getAllRooms));
router.get("/:id", asyncHandler(RoomController.getRoomById));
router.put("/:id", authMiddleware, asyncHandler(RoomController.updateRoom));
router.delete("/:id", authMiddleware, asyncHandler(RoomController.deleteRoom));

module.exports = router;