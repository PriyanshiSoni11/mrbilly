require('dotenv').config();
const mongoose = require('mongoose')
const dbgr = require('debug')('development:mongoose-connetion')

const dbUrl = `${process.env.MONGOOSE_CONNECT_URL}/mrbilly` || `${process.env.MONGOOSE_CONNECT_SERVER}/mrbilly`;

mongoose
    .connect(dbUrl)
    .then(function () {
        dbgr("Connected")
    })
    .catch(function (err) {
        dbgr(err)
    })

module.exports = mongoose.connection;