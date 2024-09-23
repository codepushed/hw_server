const express = require("express");
const {
  addService,
  getAllServices,
  getService,
} = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/user");
const router = express.Router();

router.route("/add/service").post(isLoggedIn, addService);
router.route("/services").get(getAllServices);
router.route("/service/:id").get(getService);

module.exports = router;
