const express = require("express");
const router = express.Router();

const { signup, getLoggedInProfessionalDetails, updateProfessionalDetails } = require("../controllers/professionalController");
const { isProfessionalLoggedIn } = require("../middlewares/user");

router.route("/professional/signup").post(signup);
router.route("/professional/dashbboard").get(isProfessionalLoggedIn, getLoggedInProfessionalDetails);
router.route("/professional/dashboard/update").post(isProfessionalLoggedIn, updateProfessionalDetails);

module.exports = router;