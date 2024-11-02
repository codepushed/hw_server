const express = require("express");
require('dotenv').config();
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors());

app.use(cookieParser());
app.use(fileUpload());

app.use(morgan("tiny"));


const home = require('./routes/home');
const user = require('./routes/user');
const service = require("./routes/service");
const payment = require("./routes/payment");
const professional = require("./routes/professional");
const bookings = require("./routes/booking");


app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', service);
app.use('/api/v1', payment);
app.use('/api/v1', professional);
app.use('/api/v1', bookings);

module.exports = app;