const express = require("express");
const AuthController = require("../controllers/auth.controller.js");
const asyncHandler = require("../middlewares/asyncHandler.js");
const router = express.Router();

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));
router.post("/logout", asyncHandler(AuthController.logout));

module.exports = router;