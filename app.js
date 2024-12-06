require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express')
const expressSession = require("express-session")
const app = express();
const flash = require("connect-flash")
const path = require('path')
const indexRouters = require('./routes/indexRouters')
const menuRouters = require('./routes/menuRouters')
const profileRouters = require('./routes/profileRouters')
const orderRouters = require('./routes/orderRouters')
const mongoose = require('./config/mongoose-connect');  // Import mongoose connection config

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET 
}))
app.use(flash());

app.use("/", indexRouters);
app.use("/menu", menuRouters);
app.use("/profile", profileRouters);
app.use("/order", orderRouters);


app.listen(process.env.PORT)