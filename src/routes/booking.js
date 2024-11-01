const express = require("express");

const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const { createBooking, getAllBookings, sendBookingDetails } = require("../controllers/bookingController");

router.route("/booking/create").post(isLoggedIn, createBooking);
router.route("/bookings").get(isLoggedIn, getAllBookings);
router.route("/send/bookings").post(sendBookingDetails);


module.exports = router;
