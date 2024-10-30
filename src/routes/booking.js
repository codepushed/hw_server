const express = require("express");

const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const { createBooking, getAllBookings } = require("../controllers/bookingController");

router.route("/booking/create").post(isLoggedIn, createBooking);
router.route("/bookings").get(isLoggedIn, getAllBookings);


module.exports = router;
