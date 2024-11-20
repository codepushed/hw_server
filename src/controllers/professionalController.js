const Professional = require("../models/professional");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const mailHelper = require("../utils/emailHelper");
const crypto = require("crypto");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storageNew = new Storage({
  keyFilename: path.join(__dirname, "../config/gcpStorage.json"),
});
const bucketName = "assets-hw";
const bucket = storageNew.bucket(bucketName);

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

exports.uploadFileToGCP = BigPromise(async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });
  }

  try {
    const file = req.files.file; // The uploaded file from form-data
    // Create a file object in GCP bucket with a unique name (using timestamp)
    const blob = bucket.file(Date.now() + "-" + file.name);
    const blobStream = blob.createWriteStream();

    // Pipe the file buffer to the blob stream
    blobStream.on("finish", () => {
      // Successfully uploaded to GCP
      res.status(200).json({
        success: true,
        message: "File uploaded successfully .",
        fileUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`, // Public URL of the uploaded file
      });
    });

    blobStream.on("error", (err) => {
      res.status(500).json({
        success: false,
        message: "Failed to upload file.",
        error: err.message,
      });
    });

    // Write the file buffer to the stream
    blobStream.end(file.data); // Use file.data from memory storage
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "File upload failed.",
      error: error.message,
    });
  }
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
