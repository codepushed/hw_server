const express = require("express");
const {
  addService,
  getAllServices,
  getService,
  addReview,
  deleteReview,
  deleteService,
  updateService,
  getReviewByServiceId,
} = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/user");
const router = express.Router();

router.route("/add/service").post(isLoggedIn, addService);
router.route("/services").get(getAllServices);
router.route("/service/:id").get(getService);
router.route("/review").put(isLoggedIn, addReview);
router.route("/review").delete(isLoggedIn, deleteReview);
router.route("/reviews").get(isLoggedIn, getReviewByServiceId);
router
  .route("/service/:id")
  .put(isLoggedIn, updateService)
  .delete(isLoggedIn,  deleteService);


module.exports = router;
