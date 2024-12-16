const userModel = require("../models/user-model")

module.exports.userProfile = async function (req, res) {
    const success = req.flash("success")
    res.render("profile", { user: req.user, success })
}
module.exports.updateProfile = async function (req, res) {
    console.log(JSON.stringify(req.body))
    let user = await userModel.findOne({ _id: req.user._id })
    if (!user) {
        req.flash("error", "Something went wrong")
        return res.redirect("/logout")
    } 
    res.render("profileUpdate", { user })
}
module.exports.saveProfile = async function (req, res) {
    try {
        let { fullname, address, restaurantName, restaurantAddress, gstin, tableCount } = req.body
        let user = await userModel.findOne({ _id: req.user._id })
        if (!user) {
            req.flash("error", "Something went wrong")
            res.redirect("/")
        }
        else {
            let updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                fullname,
                address,
                restaurantname: restaurantName,
                restaurantaddress : restaurantAddress,
                gstin,
                tablecount: tableCount
            })
            req.flash("success", "Profile details updated successfully")
            res.redirect("/profile")

        }


    } catch (err) {
        req.flash("error", "Something went wrong")
        res.redirect("/")
    }
}


