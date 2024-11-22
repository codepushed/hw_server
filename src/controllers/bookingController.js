const Booking = require("../models/booking");
const Service = require("../models/service");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const professional = require("../models/professional");

exports.createBooking = BigPromise(async (req, res, next) => {
  const {
    userId,
    bookingDetails,
    service,
    slotDate,
    slotTime,
    otp,
    professionalId,
  } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const pro = await professional.findById(professionalId);
  if (!pro) {
    return res.status(404).json({ success: false, message: "professional not found" });
  }

  const booking = await Booking.create({
    bookingDetails,
    user,
    service: service,
    slotDate: slotDate,
    slotTime: slotTime,
    professional: pro,
    otp: otp,
  });

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    booking,
  });
});

exports.getAllBookings = BigPromise(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.sendBookingDetails = BigPromise(async (req, res, next) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res
      .status(400)
      .json({ error: "Please provide to, subject, and message fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }

  res.status(200).json({
    success: true,
    bookings,
  });
});
