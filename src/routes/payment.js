const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');
const { captureRazorpayPayment } = require('../controllers/paymentController');

router.route("/payment").post(isLoggedIn, captureRazorpayPayment);

module.exports = router;