module.exports.userProfile = async function (req, res) {
    const success = req.flash("success")
    res.render("profile", { user: req.user , success})
}


