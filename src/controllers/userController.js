const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");
const professional = require("../models/professional");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  if (!email || !name || !password || !phone) {
    return next(new CustomError("Name, email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new CustomError("please provide email and password", 400));
  }

  const user = await User.findOne({ phone }).select("+password");

  if (!user) {
    return next(new CustomError("No account found", 400));
  }

  cookieToken(user, res);
});

exports.adminLogin = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && password) {
    return next(new CustomError("please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomError("No account found", 400));
  }

  cookieToken(user, res);
});


exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(400).json({
    success: true,
    message: "logout success",
  });
});

exports.forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError("Email not found", 400));
  }

  const forgotToken = user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const forgotUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset${forgotToken}`;

  const message = `Copy paste this link in your browser to reset password \n \n ${forgotUrl}`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Homework Service - Password reset email",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new CustomError(err.message, 500));
  }
});

exports.forgotPasswordReset = BigPromise(async (req, res, next) => {
  const token = req.params.token;

  const encryptToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    encryptToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is invalid or expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new CustomError("Password and confirm password do not match", 400)
    );
  }

  user.password = req.body.password;

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  cookieToken(user, res);
});

exports.getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = BigPromise(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId).select("+password");

  const isCorrectOldPassword = await user.isValidatePassword(
    req.body.oldPassword
  );

  if (!isCorrectOldPassword) {
    return next(new CustomError("Old password is incorrect", 400));
  }

  user.password = req.body.password;

  await user.save();

  cookieToken(user, res);
});

exports.updateUserDetails = BigPromise(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // #10-7
  //check if the user provided the image for update or note
  // if(req.files.photo !== ''){
  //  const user =  User.findById(req.user.id)

  //  const imageId = user.photo.id

  //  delete image
  //  const resp = await

  //  update new photo
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.addAddress = BigPromise(async (req, res, next) => {
  const { name, address } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  user.address.push({ name, address });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    data: user.address,
  });
});

exports.getAddress = BigPromise(async (req, res, next) => {
  // Find the user by their ID
  const user = await User.findById(req.user.id);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Respond with the user's addresses
  res.status(200).json({
    success: true,
    addresses: user.address, // Return the list of addresses
  });
});

exports.adminAllProfessionals = BigPromise(async (req, res, next) => {
  const professionals = await professional.find();

  res.status(200).json({
    success: true,
    professionals,
  });
});

exports.adminUpdateOneProfessionalDetails = BigPromise(
  async (req, res, next) => {
    const newData = {
      isAdhaarVerified: req.body.isAdhaarVerified,
    };

    const professionals = await professional.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      professionals,
    });
  }
);

exports.userAllProfessionals = BigPromise(async (req, res, next) => {
  const professionals = await professional.find();

  res.status(200).json({
    success: true,
    professionals,
  });
});

exports.getProfessionalByProfession = BigPromise(async (req, res, next) => {
  const profession = req.query.profession;

  if (!profession) {
    return res.status(400).json({ error: "Profession is required" });
  }

  const professionals = await professional.find();

  const filteredProfessionals = [];
  professionals.forEach((person) => {
    if (
      person.profession !== undefined &&
      person.profession.toLowerCase() === profession.toLowerCase()
    ) {
      filteredProfessionals.push(person);
    }
  });

  res.status(200).json({
    success: true,
    filteredProfessionals,
  });
});
