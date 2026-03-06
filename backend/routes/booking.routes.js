const express = require("express");
const BookingController = require("../controllers/booking.controller.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", authMiddleware, asyncHandler(BookingController.createBooking));
router.get("/", authMiddleware, asyncHandler(BookingController.getAllBookings));
router.get("/check", authMiddleware, asyncHandler(BookingController.isRoomAvailable));
router.get("/:id", authMiddleware, asyncHandler(BookingController.getBookingById));
router.put("/:id", authMiddleware, asyncHandler(BookingController.updateBooking));
router.delete("/:id", authMiddleware, asyncHandler(BookingController.deleteBooking));

module.exports = router;