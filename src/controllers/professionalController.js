const Professional = require("../models/professional");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, adhaarNumber, address, phone } = req.body;

  if (!name || !adhaarNumber || !address || !phone) {
    return next(
      new CustomError("Name, adhaar, address and password are required", 400)
    );
  }

  const professional = await Professional.create({
    name,
    adhaarNumber,
    address,
    phone,
  });

  cookieToken(professional, res);
});

exports.getLoggedInProfessionalDetails = BigPromise(async (req, res, next) => {
  const professional = await Professional.findById(req.professional.id);

  res.status(200).json({
    success: true,
    professional,
  });
});

exports.updateProfessionalDetails = BigPromise(async (req, res, next) => {
  const newData = {
    profession: req.body.profession,
  };

  const professional = await Professional.findByIdAndUpdate(
    req.professional.id,
    newData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    professional,
  });
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
