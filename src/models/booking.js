const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingDetails: {
   type: String,
   required: true
  },
  user: {
    type: mongoose.Schema.ObjectId, //mongoose.Schema.Types.ObjectId
    ref: "User",
    required: true,
  },
  // serviceItems: [
  //   {
  //     quantity: {
  //       type: Number,
  //       // required: true,
  //     },
  //     // image: {
  //     //   type: String,
  //     //   required: true,
  //     // },
  //     service: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "Service",
  //       required: true,
  //     },
  //   },
  // ],
  service: {
    type: Object,
  },
  professional: {
    type: Object,
  },
  slotDate: {
    type: String,
  },
  slotTime: {
    type: String,
  },
  bookingStatus: {
    type: String,
    required: false,
    enum: ["Pending", "Accepted", "Completed", "Cancelled"],
    default: "Pending",
  },
  otp: {
    type: String
  },
  acceptedAt: {
    type: Date,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
