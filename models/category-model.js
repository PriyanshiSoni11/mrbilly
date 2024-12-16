const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryname : String,
    iscategoryenabled: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    groups: [{
        groupname: String,
        isgroupenable: Boolean,
        items : [{
            category: String,
            group: String,
            itemname: String, 
            price: Number,
            isveg: Boolean,
            isenabled: Boolean,
            calories: Number,
            description: String
        }]
    }],
})

module.exports = mongoose.model('category',categorySchema )