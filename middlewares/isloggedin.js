require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function (req, res, next) {
    if(req.cookies.token === ""){
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.SERCATE_KEY)
        let data = await userModel.findOne({email: decoded.email}).select('-password');
        req.user = data;
        next();

    }catch(err){
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }

}