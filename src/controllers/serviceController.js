const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Service = require("../models/service");
const WhereClause = require('../utils/whereClause');

exports.addService = BigPromise(async (req, res, next) => {
  // images

  // let imageArray = [];

  // if (!req.files) {
  //   return next(new CustomError("images are required", 401));
  // }
  // console.log("RESULT", req.files.photos[0]);

  // if (req.files) {
  //   for (let index = 0; index < req.files.photos.length; index++) {
  //     console.log("UPLOAD START...");
  //     let result = await cloudinary.v2.uploader.upload(
  //       req.files.photos[index].tempFilePath,
  //       {
  //         folder: "products",
  //       }
  //     );

  // imageArray.push({
  //   id: result.public_id,
  //   secure_url: result.secure_url,
  // });
  //   }
  // }

  // req.body.photos = imageArray;
  req.body.user = req.user.id;
  console.log(req.body);

  const services = await Service.create(req.body);

  res.status(200).json({
    success: true,
    services,
  });
});

exports.getAllServices = BigPromise(async (req, res, next) => {
  const resultPerPage = 3;
  const totalcountProduct = await Service.countDocuments();

  const serviceObj = new WhereClause(Service.find(), req.query)
    .search()
    .filter();

  let services = await serviceObj.base;
  const filteredServiceNumber = services.length;

  //products.limit().skip()

  serviceObj.pager(resultPerPage);
  services = await serviceObj.base.clone();

  res.status(200).json({
    success: true,
    services,
    filteredServiceNumber,
    totalcountProduct,
    resultPerPage,
  });
});
