const express = require("express");

const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");
const {
  createBooking,
  getAllBookings,
  sendBookingDetails,
  updateBooking,
} = require("../controllers/bookingController");

router.route("/booking/create").post(isLoggedIn, createBooking);
router.route("/bookings").get(isLoggedIn, getAllBookings);
router.route("/send/bookings").post(sendBookingDetails);
router
  .route("/send/bookings/update")
  .post(isLoggedIn, customRole("admin"), updateBooking);

module.exports = router;
