const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const professionalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please provide a phone number"],
    unique: true,
  },
  adhaarNumber: {
    type: Number,
    required: [true, "Please provide a adhaar number"],
    minLength: [12, "Adhaar number is of 12 digit"],
    maxLength: [12, "Adhaar number is of 12 digit"],
    unique: true,
  },
  isAdhaarVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password should be atleast 6 character"],
    select: false,
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
