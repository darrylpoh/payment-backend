require('dotenv').config();
const helmet = require('helmet');
const logger = require('morgan');
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4500
const MONGO_URL = process.env.MONGO_URL;

// Getting data in json format

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up cors

let cors = require('cors');
let corsOption = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// Using Helmet

app.use(helmet())

// Logger
app.use(logger('common'))

// Connect DB
mongoose.connect(MONGO_URL);

//Importing Routes
const verify_otp = require('./routes/verifyOTP')
const send_otp_to_email = require('./routes/sendOTP_to_email')

//Using imported Routes
app.use('/api/v1/', send_otp_to_email);
app.use('/api/v1', verify_otp);

//==================================================================================================================================

// To check if server is running
app.get('/', function (req, res) {
  res.send('TikTok OTP Service is Up and Running!');
});

//Listening on port 4500 or Port set in environment
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});