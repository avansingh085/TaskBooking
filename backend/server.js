const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const globalErrorHandler = require("./middlewares/error.middleware.js");
const bookingRoutes = require('./routes/booking.routes.js');
const userRoutes = require('./routes/user.routes.js');
const roomRoutes = require('./routes/room.routes.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);

app.use(globalErrorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});