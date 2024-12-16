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
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    }],

})

module.exports = mongoose.model('user', userSchema)