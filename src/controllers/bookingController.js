const Booking = require("../models/booking");
const Service = require("../models/service");
const User = require("../models/user");

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createBooking = BigPromise(async (req, res, next) => {
  const { userId, bookingDetails, serviceId } = req.body;


  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const service = await Service.findById(serviceId);
  console.log(service, "hye")
  if (!service) {
    return next(new CustomError("No service found with this id", 401));
  }


  const booking = await Booking.create({
    bookingDetails,
    user,
    service: service,
  });

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking,
  });
});
