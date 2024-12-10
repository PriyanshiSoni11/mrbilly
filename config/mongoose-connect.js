require('dotenv').config();
const mongoose = require('mongoose')
const logger = require("./logger")
const dbgr = require('debug')('development:mongoose-connetion')

const dbUrl = `${process.env.MONGOOSE_CONNECT_URL}/mrbilly`;

mongoose
    .connect(dbUrl)
    .then(function () {
        dbgr("Connected")
        logger.info("DB cnnected")
    })
    .catch(function (err) {
        dbgr(err)
        logger.error("DB couldn't cnnect")
    })

module.exports = mongoose.connection;