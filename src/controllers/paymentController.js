const BigPromise = require("../middlewares/bigPromise");

exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorpaykey: process.env.RAZORPAY_API_KEY,
  });
});

exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  var options = {
    amount: req.body.amount,
    currency: "INR",
    // receipt: "order_rcptid_11"  nano id
  };

  const myBooking = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    booking: myBooking,
  });
});
