const express = require("express");
const {
  addService,
  getAllServices,
} = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/user");
const router = express.Router();

router.route("/add/service").post(isLoggedIn, addService);
router.route("/services").get(getAllServices);

module.exports = router;
