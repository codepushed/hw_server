const express = require("express");
const {
  addService,
  getAllServices,
  getService,
  addReview,
} = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/user");
const router = express.Router();

router.route("/add/service").post(isLoggedIn, addService);
router.route("/services").get(getAllServices);
router.route("/service/:id").get(getService);
router.route("/review").put(isLoggedIn, addReview);

module.exports = router;
