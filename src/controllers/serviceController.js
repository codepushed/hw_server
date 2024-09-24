const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Service = require("../models/service");
const WhereClause = require("../utils/whereClause");

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

exports.getService = BigPromise(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new CustomError("No service found with this id", 401));
  }
  res.status(200).json({
    success: true,
    service,
  });
});

exports.addReview = BigPromise(async (req, res, next) => {
  const { rating, comment, serviceId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const service = await Service.findById(serviceId);

  const AlreadyReview = service.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (AlreadyReview) {
    service.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    service.reviews.push(review);
    service.numberOfReviews = service.reviews.length;
  }

  // adjust ratings

  service.ratings =
    service.reviews.reduce((acc, item) => item.rating + acc, 0) /
    service.reviews.length;

  //save

  await service.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.deleteReview = BigPromise(async (req, res, next) => {
  const { serviceId } = req.query;

  const service = await Service.findById(serviceId);

  const reviews = service.reviews.filter(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  const numberOfReviews = reviews.length;

  service.ratings =
    service.reviews.reduce((acc, item) => item.rating + acc, 0) /
    service.reviews.length;

  await Service.findByIdAndUpdate(
    serviceId,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.deleteService = BigPromise(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new CustomError("No product found with this id", 401));
  }

  //destroy the existing image
  // for (let index = 0; index < service.photos.length; index++) {
  //   const res = await cloudinary.v2.uploader.destroy(product.photos[index].id);
  // }

  await Service.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "service was deleted !",
  });
});

exports.updateService = BigPromise(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new CustomError("No product found with this id", 401));
  }
  // let imagesArray = [];

  // if (req.files) {
  //   //destroy the existing image
  //   for (let index = 0; index < product.photos.length; index++) {
  //     const res = await cloudinary.v2.uploader.destroy(
  //       product.photos[index].id
  //     );
  //   }

  //   for (let index = 0; index < req.files.photos.length; index++) {
  //     let result = await cloudinary.v2.uploader.upload(
  //       req.files.photos[index].tempFilePath,
  //       {
  //         folder: "products", //folder name -> .env
  //       }
  //     );

  //     imagesArray.push({
  //       id: result.public_id,
  //       secure_url: result.secure_url,
  //     });
  //   }
  // }

  // req.body.photos = imagesArray;

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});