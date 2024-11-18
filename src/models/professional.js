const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const professionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phone: {
    type: Number,
    required: false,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Ensures exactly 10 digits
      },
      message: "Phone number should be exactly 10 digits",
    },
    sparse: true
  },
  adhaarNumber: {
    type: Number,
    required: [true, "Please provide a adhaar number"],
    validate: {
      validator: function (v) {
        return /^[0-9]{12}$/.test(v); // Ensures exactly 12 digits
      },
      message: "Adhaar number should be exactly 12 digits",
    },
  },
  isAdhaarVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  profession: {
    type: String,
  },
  isAvailable: {
    type: String,
    required: true,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    id: {
      type: String,
      // required: true,
    },
    secure_url: {
      type: String,
      // required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

professionalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

professionalSchema.methods.isValidatePassword = async function (
  userendPassword
) {
  return await bcrypt.compare(userendPassword, this.password);
};

professionalSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("Professional", professionalSchema);
