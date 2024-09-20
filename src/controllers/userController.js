const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Name, email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});


exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body

  if(!email || !password){
    return next(new CustomError('please provide email and password', 400))
  }

  const user = await User.findOne({email}).select("+password")

  if(!user){
    return next(new CustomError('No account found', 400))
  }

  const isPasswordCorrect = await user.isValidatePassword(password)
  
  if(!isPasswordCorrect){
    return next(new CustomError('No account found', 400))
  }

  cookieToken(user, res)

})