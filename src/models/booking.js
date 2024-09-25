const mongoose = require("mongoose");

// professionalDetails{name, reviews[user, name, rating, comment], noOfReviews, phoneNo 


const bookingSchema = new mongoose.Schema({
  bookingInfo: {
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
  serviceItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // image: {
      //   type: String,
      //   required: true,
      // },
      price: {
        type: Number,
        required: true,
      },
      service: {
        type: mongoose.Schema.ObjectId, //mongoose.Schema.Types.ObjectId
        ref: "Service",
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
  },
  taxAmount: {
    type: Number,
    required: false,
  },
  totalAmount: {
    type: Number,
    required: false,
  },
  bookingStatus: {
    type: String,
    required: false,
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
