const express = require("express");
const { addService } = require("../controllers/serviceController");
const { isLoggedIn } = require("../middlewares/user");
const router = express.Router();

router.route("/service").post(isLoggedIn, addService);

module.exports = router;