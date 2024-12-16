const userModel = require("../models/user-model")
const categoryModel = require("../models/category-model")

module.exports.addCategory = function (req, res) {
    const error = req.flash('error');
    res.render('addcategory', { error });
};

module.exports.saveCategory = async function (req, res) {
    let category = await categoryModel.findOne({ categoryname: req.body.categoryName })
    if (category) {
        req.flash("error", "Duplicate category name found, Delete any one to avoid confusion")
    }

    let createdcategory = await categoryModel.create({
        categoryname: req.body.categoryName,
        iscategoryenabled: true, // Default value
        user: req.user._id, // Assuming user information is available in req.user
        groups: req.body.groups.map(group => ({
            groupname: group.groupName,
            isgroupenable: group.isgroupenable === 'on',
            items: group.items.map(item => ({
                category: req.body.categoryName,
                group: group.groupName,
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
    user.categories.push(createdcategory._id)
    await user.save();
    res.redirect("/home");

}

module.exports.editCategory = async function (req, res) {
    let category = await categoryModel.findOne({ _id: req.params.categoryId })
    if (!category) {
        req.flash("error", "Something went wrong")
        return res.redirect("/home")
    }

    res.render("editCategory", {category})
}

module.exports.updateCategory = async function (req, res) {
    let category = await categoryModel.findOne({ _id: req.params.categoryId })
    if (!category) {
        req.flash("error", "Something went wrong")
        return res.redirect("/home")
    }
    let updatedCategory = await categoryModel.findOneAndUpdate({_id: req.params.categoryId},{
        categoryname: req.body.categoryName,
        iscategoryenabled: true, // Default value
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

    req.flash("success", `${category.categoryname} updated successfully`);
    res.redirect("/home")
}

module.exports.selectCategory = async function(req, res){
    let selectedCategoryId = req.body.selectedCategory
    let user = await userModel.findOne({email: req.user.email})
    user.selectedCategory = selectedCategoryId;
    await user.save();
    req.flash("success", "Selected Category updated")
    res.redirect("/home")
}
