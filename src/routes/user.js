const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  forgotPasswordReset,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  addAddress,
  getAddress,
  adminAllProfessionals,
  adminUpdateOneProfessionalDetails,
} = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").post(forgotPasswordReset);
router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/userdashboard/update").post(isLoggedIn, updateUserDetails);
router.route("/userdashboard/address").post(isLoggedIn, addAddress);
router.route("/userdashboard/address").get(isLoggedIn, getAddress);

router.route("/admin/professionals").get(isLoggedIn, customRole("admin"), adminAllProfessionals);
router
  .route("/admin/professionals/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOneProfessionalDetails);

module.exports = router;
