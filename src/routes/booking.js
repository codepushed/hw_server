const express = require("express");

const router = express.Router();
const { isLoggedIn } = require("../middlewares/user");
const { createBooking } = require("../controllers/bookingController");

router.route("/booking/create").post(isLoggedIn, createBooking);


module.exports = router;
