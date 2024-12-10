const userModel = require("../models/user-model")
const menuModel = require("../models/menu-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")
const logger = require("../config/logger")
const { error } = require("winston")

module.exports.addMenu = function (req, res) {
    const error = req.flash('error');
    res.render('addMenu', { error });
};

module.exports.saveMenu = async function (req, res) {
    let menu = await menuModel.findOne({ menuname: req.body.menuName })
    if (menu) {
        req.flash("error", "Duplicate menu name found, Delete any one to avoid confusion")
    }

    //console.log(JSON.stringify(req.body))
    let createdmenu = await menuModel.create({
        menuname: req.body.menuName,
        ismenuenabled: true, // Default value
        user: req.user._id, // Assuming user information is available in req.user
        groups: req.body.groups.map(group => ({
            groupname: group.groupName,
            isgroupenable: group.isgroupenable === 'on',
            items: group.items.map(item => ({
                itemname: item.itemname,
                price: parseFloat(item.price),
                isveg: item.isveg === 'on',
                isenabled: item.isenabled === 'on',
                calories: parseFloat(item.calories) || 0,
                description: item.description,
            })),
        })),
    })

    let user = await userModel.findOne({email:req.user.email})
    user.menus.push(createdmenu._id)
    //user.selectedMenu = createdmenu._id;
    await user.save();
    res.redirect("/home");

}

module.exports.selectMenu = async function(req, res){
    let selectedMenuId = req.body.selectedMenu
    let user = await userModel.findOne({email: req.user.email})
    user.selectedMenu = selectedMenuId;
    await user.save();
    req.flash("success", "Selected Menu updated")
    res.redirect("/home")
}
