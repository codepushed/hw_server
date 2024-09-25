const Booking = require("../models/booking");
const Service = require("../models/service");

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createBooking = BigPromise(async (req, res, next) => {
  const {
    bookingInfo,
    serviceItems,
    paymentInfo,
    taxAmount,
    totalAmount,
  } = req.body;

  const booking = await Order.create({
    bookingInfo,
    serviceItems,
    paymentInfo,
    taxAmount,
    totalAmount,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    booking,
  });
});
