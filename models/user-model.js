const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    address: String,
    restaurantname: String,
    restaurantaddress: String,
    gstin: String,
    tablecount: Number,
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
    }],
    selectedMenu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
        default: function () {
            return this.menus && this.menus.length > 0 ? this.menus[0] : null;
        },
    }

})

module.exports = mongoose.model('user', userSchema)