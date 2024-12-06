const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const logger = require("../config/logger")
const menuModel = require("../models/menu-model")


module.exports.login = function (req, res) {
    let error = req.flash("error")
    res.render("login", { error })
}

module.exports.userProfile = async function (req, res) {
    let success = req.flash("error")
    let user = await userModel.findOne({email: req.user.email})
    res.render("profile", { user: req.user,success,  })
}

module.exports.register = function (req, res) {
    res.render("register")
}

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password, address, restaurantName, restaurantAddress, gstin, tableCount } = req.body
        let user = await userModel.findOne({ email })
        if (user) {
            req.flash("error", "You are already regiseted, Please login")
            res.redirect("/")
        }
        else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, result) {
                    let createUser = await userModel.create({
                        fullname,
                        email,
                        password: result,
                        address,
                        restaurantname: restaurantName,
                        restaurantaddress: restaurantAddress,
                        gstin,
                        tablecount: tableCount
                    })
                    const token = generateToken(createUser)
                    res.cookie("token", token)
                    req.flash("success", `Welcome ${fullname}`)
                    res.redirect("/profile")
                })
            })

        }


    } catch (err) {
        logger.info(err.message)
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body
        let user = await userModel.findOne({ email })
        if (!user) {
            req.flash("error", "Incorrect email or password")
            return res.redirect("/")
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                req.flash("error", "Incorrect email or password")
                return res.redirect("/")
            }
            let token = generateToken(user);
            res.cookie("token", token)
            req.flash("success", `Welcome back ${user.fullname}`)
            if(user.menus.length >0){
                return res.redirect("/home")
            }
            res.redirect("/profile")
        })

    } catch (err) {
        logger.info(err.message)
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }
}

module.exports.logoutUser = async function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}

module.exports.userHome = async function(req,res){
    let user = await userModel.findOne({email: req.user.email}).select("-password").populate('menus').populate('selectedMenu')
    let success = req.flash("success")
    res.render("home", {user, success})
}
