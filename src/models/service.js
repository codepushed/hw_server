const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "please provide product name"],
    trim: true,
    maxlength: [120, "Product name should not be more than 120 characters"],
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  subCategory: [
    {
      name: {
        type: String,
        required: true,
      },
      subServiceName: [
        {
          name: {
            type: String,
            required: true,
          },
          price: {
            type: String,
          },
          desc: {
            type: String,
            required: true,
          },
          image: {
            type: String,
          },
        },
      ],
    },
  ],
  //   images: [String],
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  cities: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Services", serviceSchema);
