const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    menuname : String,
    ismenuenabled: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    groups: [{
        groupname: String,
        isgroupenable: Boolean,
        items : [{
            itemname: String, 
            price: Number,
            isveg: Boolean,
            isenabled: Boolean,
            calories: Number,
            description: String
        }]
    }],
})

module.exports = mongoose.model('menu',menuSchema )