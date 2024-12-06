const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    table: Number,
    orderid: String,
    ispaid: Boolean,
    placedAt: { type: Date, default: Date.now },
    total: Number,
    ordertype: {
        type: String,
        enum: ['dinning', 'parcel', 'online'], // Allows only these three values
        required: true, // Ensures this field is mandatory
    },
    items: [{
            itemname: String,
            price: Number,
            quantity: { type: Number, required: true },
            status: {type: String,enum: ['ordered', 'cooking', 'ready', 'delivered'], default: 'ordered' },
            itemPlacedAt: { type: Date, default: Date.now },

        }],
    orderstatus:{
        type: String,
        enum: ['placed', 'modified' , 'preparing', 'completed'], // Allows only these three values
        required: true, // Ensures this field is mandatory
    },
})

module.exports = mongoose.model('order', orderSchema)