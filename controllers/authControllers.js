const userModel = require("../models/user-model")
const orderModel = require("../models/order-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const mongoose = require('../config/mongoose-connect');  // Import mongoose connection config


module.exports.login = function (req, res) {
    let error = req.flash("error")
    res.render("login", { error })
}

module.exports.userProfile = async function (req, res) {
    let success = req.flash("error")
    let user = await userModel.findOne({ email: req.user.email })
    res.render("profile", { user: req.user, success, })
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
            res.redirect("/profile")
        })

    } catch (err) {
        console.log(err.message)
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }

}

module.exports.logoutUser = async function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}

module.exports.userHome = async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).select("-password").populate('categories')
    let success = req.flash("success")
    res.render("home", { user, success })
}

module.exports.analysis = async function (req, res) {
    const { fromDate, toDate } = req.query;
    console.log(req.query);

    let from, to;

    if (fromDate && toDate) {
        // Parse the provided dates
        try {
            from = new Date(fromDate);
            to = new Date(toDate);

            if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                throw new Error();
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid date format. Use ISO date format (YYYY-MM-DD).' });
        }

        if (from > to) {
            return res.status(400).json({ message: 'fromDate cannot be after toDate.' });
        }
    } else {
        // Set to today's range
        const now = new Date();
        from = new Date(now.setHours(0, 0, 0, 0)); // Start of today
        to = new Date(now.setHours(23, 59, 59, 999)); // End of today
    }

    // Construct the query
    const query = {
        user: req.user._id,
        ispaid: true,
        placedAt: {
            $gte: from,
            $lte: to,
        },
    };

    try {
        // Execute the query
        const orders = await orderModel.find(query);

        let totalAmount = 0;
        let totalItems = 0;
        orders.forEach(order => {
            totalAmount += order.total;
            order.items.forEach((item) => {
                totalItems += item.quantity;
            });
        });

        // Check if the request expects JSON or a full page
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            // Respond with JSON if requested by fetch()
            return res.json({
                orders,
                totalAmount,
                totalOrders: orders.length,
                totalItems
            });
        } else {
            // Respond with the EJS rendered page for regular requests
            let success = req.flash("success");
            res.render("analysis", { orders, success, totalAmount, totalOrders: orders.length, totalItems });
        }
    } catch (error) {
        console.error("Error fetching or processing orders:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
