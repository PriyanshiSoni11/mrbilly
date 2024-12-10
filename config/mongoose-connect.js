require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dbgr = require('debug')('development:mongoose-connection');

const dbUrl = `${process.env.MONGOOSE_CONNECT_SERVER}`;

mongoose
    .connect(dbUrl) // Removed useUnifiedTopology
    .then(() => dbgr('Connected to MongoDB'))
    .catch(err => {
        dbgr('Error connecting to MongoDB:', err);
    });

mongoose.connection.on('connected', () => dbgr('Mongoose default connection is open'));
mongoose.connection.on('error', err => dbgr(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => dbgr('Mongoose default connection is disconnected'));

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: dbUrl,  // MongoDB connection URL
        ttl: 24 * 60 * 60, // 1-day session expiration
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});


module.exports = {
    connection: mongoose.connection,
    sessionMiddleware,
};
