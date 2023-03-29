const express = require('express')
const cors = require('cors');
require('dotenv').config()
const mongoose  = require('mongoose');
const app = express()
const cookieParser = require('cookie-parser')
const route = require('./routes/allRoutes')

require("dotenv").config();

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use('/', route);


mongoose.connect(
  process.env.MONGO_URL
);

app.listen(4000)
