const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingDetails: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
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
  bookingStatus: {
    type: String,
    required: false,
    enum: ["Pending", "Accepted", "Completed", "Cancelled"],
    default: "Pending",
  },
  professional: {
    type: mongoose.Schema.ObjectId,
    ref: "Professional",
    default: null,
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
