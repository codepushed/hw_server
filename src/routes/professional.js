const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/professionalController");

router.route("/professional/signup").post(signup);

module.exports = router;
