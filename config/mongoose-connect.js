const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dbgr = require('debug')('development:mongoose-connection');

const dbUrl =
  process.env.MONGOOSE_CONNECT_URL
    ? `${process.env.MONGOOSE_CONNECT_URL}/mrbilly`
    : `${process.env.MONGOOSE_CONNECT_SERVER}/mrbilly`;

mongoose
  .connect(dbUrl)
  .then(() => dbgr('Connected to MongoDB'))
  .catch(err => dbgr('Error connecting to MongoDB:', err));

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbUrl,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

module.exports = {
  connection: mongoose.connection,
  sessionMiddleware,
};
