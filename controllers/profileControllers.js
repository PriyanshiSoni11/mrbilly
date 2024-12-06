const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const logger = require("../config/logger")


module.exports.userProfile = async function (req, res) {
    const success = req.flash("success")
    res.render("profile", { user: req.user , success})
}


