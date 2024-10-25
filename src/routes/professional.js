const express = require("express");
const router = express.Router();

const { signup, getLoggedInProfessionalDetails } = require("../controllers/professionalController");
const { isProfessionalLoggedIn } = require("../middlewares/user");

router.route("/professional/signup").post(signup);
router.route("/professional/dashbboard").get(isProfessionalLoggedIn, getLoggedInProfessionalDetails);

module.exports = router;