const Professional = require("../models/professional");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, password, adhaarNumber, address, phoneNumber } = req.body;

  console.log(req.body)

  if (!name || !password || !adhaarNumber || !address || !phoneNumber) {
    return next(new CustomError("Name, adhaar and password are required", 400));
  }

  const professional = await Professional.create({
    name,
    password,
    adhaarNumber,
    address,
    phoneNumber
  });

  cookieToken(professional, res);
});

// exports.login = BigPromise(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new CustomError("please provide email and password", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new CustomError("No account found", 400));
//   }

//   const isPasswordCorrect = await user.isValidatePassword(password);

//   if (!isPasswordCorrect) {
//     return next(new CustomError("No account found", 400));
//   }

//   cookieToken(user, res);
// });

// exports.logout = BigPromise(async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   res.status(400).json({
//     success: true,
//     message: "logout success",
//   });
// });
